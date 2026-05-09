"use strict";
(self["webpackChunkfidus_writer"] = self["webpackChunkfidus_writer"] || []).push([["js_modules_editor_e2ee_passphrase-manager_js"], {
"./js/modules/editor/e2ee/key-manager.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  E2EEKeyManager: function() { return E2EEKeyManager; }
});
/**
 * E2EE Key Manager - Handles key derivation and salt generation for
 * end-to-end encrypted documents.
 *
 * Uses PBKDF2 with SHA-256 to derive a 256-bit AES-GCM key from a
 * user-supplied password and a server-stored salt. The salt and
 * iteration count are stored on the server as part of the Document
 * model (Document.e2ee_salt and Document.e2ee_iterations),
 * so the user only needs the password to decrypt from any device.
 *
 * The key is marked as non-extractable for security — it cannot be
 * read back from the CryptoKey object once created.
 */
class E2EEKeyManager {
    /**
     * Derive an AES-GCM key from a password and salt using PBKDF2.
     *
     * @param {string} password - The user-supplied password
     * @param {Uint8Array} salt - The salt (16 bytes), fetched from the server
     *   as part of the document data (get_doc_data or subscribe)
     * @param {number} [iterations=600000] - PBKDF2 iteration count
     *   (OWASP 2023 recommendation for PBKDF2-SHA256)
     * @returns {Promise<CryptoKey>} A non-extractable AES-GCM 256-bit key
     */
    static async deriveKey(password, salt, iterations = 600000) {
        const encoder = new TextEncoder()
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            encoder.encode(password),
            "PBKDF2",
            false,
            ["deriveKey"]
        )

        const key = await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: iterations,
                hash: "SHA-256"
            },
            keyMaterial,
            {name: "AES-GCM", length: 256},
            true, // extractable — required for sessionStorage caching
            ["encrypt", "decrypt"]
        )

        return key
    }

    /**
     * Store an AES-GCM key in sessionStorage for the current browser session.
     * The key is exported as raw bytes and Base64-encoded before storage.
     *
     * @param {number} documentId - The document ID
     * @param {CryptoKey} key - The AES-GCM key to store
     */
    static async storeKeyInSession(documentId, key) {
        const raw = await crypto.subtle.exportKey("raw", key)
        const base64 = btoa(String.fromCharCode(...new Uint8Array(raw)))
        sessionStorage.setItem(`e2ee_key_${documentId}`, base64)
    }

    /**
     * Retrieve an AES-GCM key from sessionStorage.
     *
     * @param {number} documentId - The document ID
     * @returns {Promise<CryptoKey|null>} The imported key, or null if not found
     */
    static getKeyFromSession(documentId) {
        const base64 = sessionStorage.getItem(`e2ee_key_${documentId}`)
        if (!base64) {
            return null
        }
        const binary = atob(base64)
        const raw = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) {
            raw[i] = binary.charCodeAt(i)
        }
        return crypto.subtle.importKey(
            "raw",
            raw,
            {name: "AES-GCM", length: 256},
            true,
            ["encrypt", "decrypt"]
        )
    }

    /**
     * Remove a cached key from sessionStorage.
     *
     * @param {number} documentId - The document ID
     */
    static clearKeyFromSession(documentId) {
        sessionStorage.removeItem(`e2ee_key_${documentId}`)
    }

    /**
     * Clear all cached E2EE keys from sessionStorage.
     * Should be called on sign-out or session expiration.
     */
    static clearAllKeysFromSession() {
        for (let i = sessionStorage.length - 1; i >= 0; i--) {
            const key = sessionStorage.key(i)
            if (key && key.startsWith("e2ee_key_")) {
                sessionStorage.removeItem(key)
            }
        }
    }

    /**
     * Generate a new random salt (16 bytes).
     *
     * Used when creating a new E2EE document or changing the password.
     * The generated salt is sent to the server and stored in
     * Document.e2ee_salt. The salt is not a secret — its purpose
     * is to ensure that two documents with the same password produce
     * different derived keys (preventing rainbow table attacks).
     *
     * @returns {Uint8Array} A 16-byte random salt
     */
    static generateSalt() {
        return crypto.getRandomValues(new Uint8Array(16))
    }

    /**
     * Resolve a document password to an AES-GCM key.
     *
     * If the password is a valid base64/base64url-encoded 32-byte string
     * (43 or 44 characters), it is treated as a raw DEK and imported
     * directly without PBKDF2. Otherwise, the key is derived via PBKDF2.
     *
     * @param {string} password - The document password
     * @param {Uint8Array} salt - The salt (16 bytes)
     * @param {number} [iterations=600000] - PBKDF2 iteration count
     * @returns {Promise<CryptoKey>} The AES-GCM key
     */
    static resolvePasswordToKey(password, salt, iterations = 600000) {
        // Try to interpret as raw base64/base64url DEK first
        if (password.length === 44 || password.length === 43) {
            let decoded = null
            try {
                decoded = atob(password)
            } catch (_e) {
                // Try base64url with padding conversion
                try {
                    let base64 = password.replace(/-/g, "+").replace(/_/g, "/")
                    while (base64.length % 4) {
                        base64 += "="
                    }
                    decoded = atob(base64)
                } catch (_e2) {
                    // Not valid base64url either
                }
            }
            if (decoded && decoded.length === 32) {
                const raw = new Uint8Array(decoded.length)
                for (let i = 0; i < decoded.length; i++) {
                    raw[i] = decoded.charCodeAt(i)
                }
                return crypto.subtle.importKey(
                    "raw",
                    raw,
                    {name: "AES-GCM", length: 256},
                    true,
                    ["encrypt", "decrypt"]
                )
            }
        }
        // Fall back to PBKDF2 derivation
        return E2EEKeyManager.deriveKey(password, salt, iterations)
    }

    /**
     * Store the document password in sessionStorage.
     *
     * @param {number} documentId - The document ID
     * @param {string} password - The document password
     */
    static storePasswordInSession(documentId, password) {
        sessionStorage.setItem(`e2ee_password_${documentId}`, password)
    }

    /**
     * Retrieve the document password from sessionStorage.
     *
     * @param {number} documentId - The document ID
     * @returns {string|null} The password, or null if not found
     */
    static getPasswordFromSession(documentId) {
        return sessionStorage.getItem(`e2ee_password_${documentId}`)
    }

    /**
     * Remove a cached password from sessionStorage.
     *
     * @param {number} documentId - The document ID
     */
    static clearPasswordFromSession(documentId) {
        sessionStorage.removeItem(`e2ee_password_${documentId}`)
    }
}


}),
"./js/modules/editor/e2ee/passphrase-crypto.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PassphraseCrypto: function() { return PassphraseCrypto; }
});
/**
 * PassphraseCrypto - Client-side cryptography for the Personal Passphrase system.
 *
 * Handles:
 * - Master key (MK) generation and storage
 * - ECDH P-256 key pair generation and storage
 * - Recovery key generation
 * - Key-wrapping key (KWK) derivation from passphrase via PBKDF2
 * - Encryption of MK and private key (SK) with KWK
 * - Backup encryption of MK with recovery key
 * - ECIES-style encryption of DEK with recipient's public key
 * - Session storage management for MK and SK
 */

class PassphraseCrypto {
    // --- Key Generation ---

    /**
     * Generate a new 256-bit AES-GCM master key.
     * The key is marked extractable so it can be exported for sessionStorage.
     */
    static generateMasterKey() {
        return crypto.subtle.generateKey(
            {name: "AES-GCM", length: 256},
            true, // extractable for sessionStorage
            ["encrypt", "decrypt"]
        )
    }

    /**
     * Generate a random document password that is itself a valid raw DEK.
     * Returns a 44-character base64-encoded 32-byte AES key.
     * This password can be used directly as the encryption key without PBKDF2.
     */
    static async generateDocumentPassword() {
        const key = await crypto.subtle.generateKey(
            {name: "AES-GCM", length: 256},
            true,
            ["encrypt", "decrypt"]
        )
        const raw = await crypto.subtle.exportKey("raw", key)
        return btoa(String.fromCharCode(...new Uint8Array(raw)))
    }

    /**
     * Generate a new ECDH P-256 key pair.
     * Both keys are marked extractable so the private key can be stored encrypted.
     */
    static generateKeyPair() {
        return crypto.subtle.generateKey(
            {name: "ECDH", namedCurve: "P-256"},
            true, // extractable for encrypted storage
            ["deriveKey"]
        )
    }

    /**
     * Generate a 128-bit recovery key as a hex string.
     * This is shown to the user once during setup.
     */
    static generateRecoveryKey() {
        const bytes = crypto.getRandomValues(new Uint8Array(16))
        return PassphraseCrypto._bytesToHex(bytes)
    }

    /**
     * Generate a random 16-byte salt for PBKDF2.
     */
    static generateSalt() {
        return crypto.getRandomValues(new Uint8Array(16))
    }

    // --- Key Derivation ---

    /**
     * Derive a key-wrapping key (KWK) from a passphrase and salt using PBKDF2.
     *
     * @param {string} passphrase - The user's personal passphrase
     * @param {Uint8Array} salt - 16-byte random salt
     * @param {number} iterations - PBKDF2 iteration count (default 600000)
     * @returns {Promise<CryptoKey>} An extractable AES-GCM-256 key
     */
    static async deriveKWK(passphrase, salt, iterations = 600000) {
        const encoder = new TextEncoder()
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            encoder.encode(passphrase),
            "PBKDF2",
            false,
            ["deriveKey"]
        )
        return crypto.subtle.deriveKey(
            {name: "PBKDF2", salt, iterations, hash: "SHA-256"},
            keyMaterial,
            {name: "AES-GCM", length: 256},
            true, // extractable so it can be used to encrypt keys
            ["encrypt", "decrypt"]
        )
    }

    // --- Key Wrapping / Unwrapping ---

    /**
     * Wrap (encrypt) a CryptoKey with a wrapping key using AES-KW.
     * Returns a Base64-encoded wrapped key.
     */
    static async wrapKey(keyToWrap, wrappingKey) {
        const wrapped = await crypto.subtle.wrapKey(
            "raw",
            keyToWrap,
            wrappingKey,
            "AES-KW"
        )
        return PassphraseCrypto._bytesToBase64(new Uint8Array(wrapped))
    }

    /**
     * Unwrap (decrypt) a wrapped key with a wrapping key.
     * Returns the original CryptoKey.
     */
    static unwrapKey(wrappedKeyBase64, wrappingKey, keyType = "AES-GCM") {
        const wrapped = PassphraseCrypto._base64ToBytes(wrappedKeyBase64)
        const algorithm =
            keyType === "AES-GCM"
                ? {name: "AES-GCM", length: 256}
                : {name: "HMAC", hash: "SHA-256", length: 256}
        const usages =
            keyType === "AES-GCM" ? ["encrypt", "decrypt"] : ["sign", "verify"]
        return crypto.subtle.unwrapKey(
            "raw",
            wrapped,
            wrappingKey,
            "AES-KW",
            algorithm,
            true,
            usages
        )
    }

    /**
     * Wrap a private key (JWK format) with a wrapping key.
     * Returns a Base64-encoded wrapped JWK.
     */
    static async wrapPrivateKey(privateKey, wrappingKey) {
        const wrapped = await crypto.subtle.wrapKey(
            "jwk",
            privateKey,
            wrappingKey,
            "AES-KW"
        )
        return PassphraseCrypto._bytesToBase64(new Uint8Array(wrapped))
    }

    /**
     * Unwrap a private key (JWK format) with a wrapping key.
     */
    static unwrapPrivateKey(wrappedKeyBase64, wrappingKey) {
        const wrapped = PassphraseCrypto._base64ToBytes(wrappedKeyBase64)
        return crypto.subtle.unwrapKey(
            "jwk",
            wrapped,
            wrappingKey,
            "AES-KW",
            {name: "ECDH", namedCurve: "P-256"},
            true,
            ["deriveKey"]
        )
    }

    // --- AES-GCM encryption for key material (fallback when AES-KW not suitable) ---

    /**
     * Encrypt a raw key with AES-GCM.
     * Returns Base64 string: iv (12 bytes) + ciphertext.
     */
    static async encryptKey(key, encryptionKey) {
        const raw = await crypto.subtle.exportKey("raw", key)
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const ciphertext = await crypto.subtle.encrypt(
            {name: "AES-GCM", iv},
            encryptionKey,
            raw
        )
        const combined = new Uint8Array(iv.length + ciphertext.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(ciphertext), iv.length)
        return PassphraseCrypto._bytesToBase64(combined)
    }

    /**
     * Decrypt a raw key with AES-GCM.
     */
    static async decryptKey(
        encryptedKeyBase64,
        encryptionKey,
        keyType = "AES-GCM"
    ) {
        const combined = PassphraseCrypto._base64ToBytes(encryptedKeyBase64)
        const iv = combined.slice(0, 12)
        const ciphertext = combined.slice(12)
        const raw = await crypto.subtle.decrypt(
            {name: "AES-GCM", iv},
            encryptionKey,
            ciphertext
        )
        const algorithm =
            keyType === "AES-GCM"
                ? {name: "AES-GCM", length: 256}
                : {name: "HMAC", hash: "SHA-256", length: 256}
        const usages =
            keyType === "AES-GCM" ? ["encrypt", "decrypt"] : ["sign", "verify"]
        return crypto.subtle.importKey("raw", raw, algorithm, true, usages)
    }

    /**
     * Encrypt a private key (exported as JWK JSON string) with AES-GCM.
     */
    static async encryptPrivateKey(privateKey, encryptionKey) {
        const jwk = await crypto.subtle.exportKey("jwk", privateKey)
        const jwkString = JSON.stringify(jwk)
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const encoded = new TextEncoder().encode(jwkString)
        const ciphertext = await crypto.subtle.encrypt(
            {name: "AES-GCM", iv},
            encryptionKey,
            encoded
        )
        const combined = new Uint8Array(iv.length + ciphertext.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(ciphertext), iv.length)
        return PassphraseCrypto._bytesToBase64(combined)
    }

    /**
     * Decrypt a private key (as JWK JSON string) with AES-GCM.
     */
    static async decryptPrivateKey(encryptedPrivateKeyBase64, encryptionKey) {
        const combined = PassphraseCrypto._base64ToBytes(
            encryptedPrivateKeyBase64
        )
        const iv = combined.slice(0, 12)
        const ciphertext = combined.slice(12)
        const decrypted = await crypto.subtle.decrypt(
            {name: "AES-GCM", iv},
            encryptionKey,
            ciphertext
        )
        const jwkString = new TextDecoder().decode(decrypted)
        const jwk = JSON.parse(jwkString)
        return crypto.subtle.importKey(
            "jwk",
            jwk,
            {name: "ECDH", namedCurve: "P-256"},
            true,
            ["deriveKey"]
        )
    }

    // --- Public Key Import/Export ---

    /**
     * Export a public key to JWK JSON string for sharing.
     */
    static async exportPublicKey(publicKey) {
        const jwk = await crypto.subtle.exportKey("jwk", publicKey)
        return JSON.stringify(jwk)
    }

    /**
     * Import a public key from JWK JSON string.
     */
    static importPublicKey(jwkString) {
        const jwk = JSON.parse(jwkString)
        return crypto.subtle.importKey(
            "jwk",
            jwk,
            {name: "ECDH", namedCurve: "P-256"},
            true,
            []
        )
    }

    // --- ECIES-style DEK encryption for sharing ---

    /**
     * Encrypt a DEK with a recipient's public key using ECIES-style encryption.
     *
     * 1. Generate an ephemeral ECDH key pair.
     * 2. Derive a shared AES-GCM key from ephemeral private + recipient public.
     * 3. Encrypt the DEK with the shared key.
     * 4. Return ephemeral public key + encrypted DEK.
     *
     * @param {CryptoKey} dek - The document encryption key (AES-GCM key)
     * @param {CryptoKey} recipientPublicKey - The recipient's ECDH public key
     * @returns {Promise<Object>} {ephemeralPublicKeyJwk: string, encryptedDEK: string}
     */
    static async encryptDEKWithPublicKey(dek, recipientPublicKey) {
        // Generate ephemeral key pair
        const ephemeralPair = await crypto.subtle.generateKey(
            {name: "ECDH", namedCurve: "P-256"},
            true,
            ["deriveKey"]
        )

        // Derive shared AES-GCM key
        const sharedKey = await crypto.subtle.deriveKey(
            {name: "ECDH", public: recipientPublicKey},
            ephemeralPair.privateKey,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        )

        // Export DEK as raw bytes, then encrypt with shared key
        const dekRaw = await crypto.subtle.exportKey("raw", dek)
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const ciphertext = await crypto.subtle.encrypt(
            {name: "AES-GCM", iv},
            sharedKey,
            dekRaw
        )

        // Export ephemeral public key
        const ephemeralPublicJwk = await crypto.subtle.exportKey(
            "jwk",
            ephemeralPair.publicKey
        )

        const combined = new Uint8Array(iv.length + ciphertext.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(ciphertext), iv.length)

        return {
            ephemeralPublicKeyJwk: JSON.stringify(ephemeralPublicJwk),
            encryptedDEK: PassphraseCrypto._bytesToBase64(combined)
        }
    }

    /**
     * Decrypt a DEK that was encrypted with the user's public key.
     *
     * @param {string} encryptedDEKBase64 - iv + ciphertext
     * @param {string} ephemeralPublicKeyJwk - JSON string of ephemeral public key JWK
     * @param {CryptoKey} privateKey - The user's ECDH private key
     * @returns {Promise<CryptoKey>} The decrypted DEK (AES-GCM key)
     */
    static async decryptDEKWithPrivateKey(
        encryptedDEKBase64,
        ephemeralPublicKeyJwk,
        privateKey
    ) {
        // Import ephemeral public key
        const ephemeralPublicJwk = JSON.parse(ephemeralPublicKeyJwk)
        const ephemeralPublicKey = await crypto.subtle.importKey(
            "jwk",
            ephemeralPublicJwk,
            {name: "ECDH", namedCurve: "P-256"},
            true,
            []
        )

        // Derive shared AES-GCM key
        const sharedKey = await crypto.subtle.deriveKey(
            {name: "ECDH", public: ephemeralPublicKey},
            privateKey,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        )

        // Decrypt DEK
        const combined = PassphraseCrypto._base64ToBytes(encryptedDEKBase64)
        const iv = combined.slice(0, 12)
        const ciphertext = combined.slice(12)
        const dekRaw = await crypto.subtle.decrypt(
            {name: "AES-GCM", iv},
            sharedKey,
            ciphertext
        )

        return crypto.subtle.importKey(
            "raw",
            dekRaw,
            {name: "AES-GCM", length: 256},
            true,
            ["encrypt", "decrypt"]
        )
    }

    /**
     * Encrypt a string with AES-GCM using a direct key (e.g. master key).
     */
    static async encryptString(str, encryptionKey) {
        const encoder = new TextEncoder()
        const data = encoder.encode(str)
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const ciphertext = await crypto.subtle.encrypt(
            {name: "AES-GCM", iv},
            encryptionKey,
            data
        )
        const combined = new Uint8Array(iv.length + ciphertext.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(ciphertext), iv.length)
        return PassphraseCrypto._bytesToBase64(combined)
    }

    /**
     * Decrypt a string with AES-GCM using a direct key.
     */
    static async decryptString(encryptedBase64, encryptionKey) {
        const combined = PassphraseCrypto._base64ToBytes(encryptedBase64)
        const iv = combined.slice(0, 12)
        const ciphertext = combined.slice(12)
        const decrypted = await crypto.subtle.decrypt(
            {name: "AES-GCM", iv},
            encryptionKey,
            ciphertext
        )
        const decoder = new TextDecoder()
        return decoder.decode(decrypted)
    }

    /**
     * Encrypt a string with a recipient's public key using ECIES-style encryption.
     * Same as encryptDEKWithPublicKey but for string data instead of a CryptoKey.
     */
    static async encryptStringWithPublicKey(str, recipientPublicKey) {
        const encoder = new TextEncoder()
        const data = encoder.encode(str)

        const ephemeralPair = await crypto.subtle.generateKey(
            {name: "ECDH", namedCurve: "P-256"},
            true,
            ["deriveKey"]
        )

        const sharedKey = await crypto.subtle.deriveKey(
            {name: "ECDH", public: recipientPublicKey},
            ephemeralPair.privateKey,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        )

        const iv = crypto.getRandomValues(new Uint8Array(12))
        const ciphertext = await crypto.subtle.encrypt(
            {name: "AES-GCM", iv},
            sharedKey,
            data
        )

        const ephemeralPublicJwk = await crypto.subtle.exportKey(
            "jwk",
            ephemeralPair.publicKey
        )

        const combined = new Uint8Array(iv.length + ciphertext.byteLength)
        combined.set(iv, 0)
        combined.set(new Uint8Array(ciphertext), iv.length)

        return {
            ephemeralPublicKeyJwk: JSON.stringify(ephemeralPublicJwk),
            encryptedData: PassphraseCrypto._bytesToBase64(combined)
        }
    }

    /**
     * Decrypt a string that was encrypted with the user's public key.
     * Returns the plaintext string.
     */
    static async decryptStringWithPrivateKey(
        encryptedDataBase64,
        ephemeralPublicKeyJwk,
        privateKey
    ) {
        const ephemeralPublicJwk = JSON.parse(ephemeralPublicKeyJwk)
        const ephemeralPublicKey = await crypto.subtle.importKey(
            "jwk",
            ephemeralPublicJwk,
            {name: "ECDH", namedCurve: "P-256"},
            true,
            []
        )

        const sharedKey = await crypto.subtle.deriveKey(
            {name: "ECDH", public: ephemeralPublicKey},
            privateKey,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        )

        const combined = PassphraseCrypto._base64ToBytes(encryptedDataBase64)
        const iv = combined.slice(0, 12)
        const ciphertext = combined.slice(12)
        const decrypted = await crypto.subtle.decrypt(
            {name: "AES-GCM", iv},
            sharedKey,
            ciphertext
        )

        const decoder = new TextDecoder()
        return decoder.decode(decrypted)
    }

    // --- Session Storage ---

    /**
     * Store the master key and private key in sessionStorage.
     * Both keys are exported and Base64-encoded.
     */
    static async storeKeysInSession(masterKey, privateKey) {
        const mkRaw = await crypto.subtle.exportKey("raw", masterKey)
        const mkBase64 = PassphraseCrypto._bytesToBase64(new Uint8Array(mkRaw))
        sessionStorage.setItem("e2ee_master_key", mkBase64)

        const jwk = await crypto.subtle.exportKey("jwk", privateKey)
        sessionStorage.setItem("e2ee_private_key", JSON.stringify(jwk))
    }

    /**
     * Retrieve the master key and private key from sessionStorage.
     * Returns {masterKey: CryptoKey|null, privateKey: CryptoKey|null}
     */
    static async getKeysFromSession() {
        const mkBase64 = sessionStorage.getItem("e2ee_master_key")
        const skJwkString = sessionStorage.getItem("e2ee_private_key")
        if (!mkBase64 || !skJwkString) {
            return {masterKey: null, privateKey: null}
        }
        try {
            const mkRaw = PassphraseCrypto._base64ToBytes(mkBase64)
            const masterKey = await crypto.subtle.importKey(
                "raw",
                mkRaw,
                {name: "AES-GCM", length: 256},
                true,
                ["encrypt", "decrypt"]
            )
            const skJwk = JSON.parse(skJwkString)
            const privateKey = await crypto.subtle.importKey(
                "jwk",
                skJwk,
                {name: "ECDH", namedCurve: "P-256"},
                true,
                ["deriveKey"]
            )
            return {masterKey, privateKey}
        } catch (_e) {
            PassphraseCrypto.clearKeysFromSession()
            return {masterKey: null, privateKey: null}
        }
    }

    /**
     * Check if keys are present in sessionStorage.
     */
    static hasKeysInSession() {
        return !!(
            sessionStorage.getItem("e2ee_master_key") &&
            sessionStorage.getItem("e2ee_private_key")
        )
    }

    /**
     * Clear master key and private key from sessionStorage.
     */
    static clearKeysFromSession() {
        sessionStorage.removeItem("e2ee_master_key")
        sessionStorage.removeItem("e2ee_private_key")
    }

    // --- Helpers ---

    static _bytesToBase64(bytes) {
        let binary = ""
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return btoa(binary)
    }

    static _base64ToBytes(base64) {
        const binary = atob(base64)
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i)
        }
        return bytes
    }

    static _bytesToHex(bytes) {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, "0"))
            .join("")
    }

    static _hexToBytes(hex) {
        const bytes = new Uint8Array(hex.length / 2)
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
        }
        return bytes
    }
}


}),
"./js/modules/editor/e2ee/passphrase-manager.js": (function (__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PassphraseManager: function() { return PassphraseManager; }
});
/* import */ var _common__rspack_import_0 = __webpack_require__("./js/modules/common/index.js");
/* import */ var _key_manager__rspack_import_1 = __webpack_require__("./js/modules/editor/e2ee/key-manager.js");
/* import */ var _passphrase_crypto__rspack_import_2 = __webpack_require__("./js/modules/editor/e2ee/passphrase-crypto.js");
/**
 * PassphraseManager - Manages the personal passphrase system for E2EE.
 *
 * This module ties together PassphraseCrypto with the server API to provide:
 * - Setup flow: generate keys, derive KWK, encrypt, send to server
 * - Unlock flow: fetch from server, derive KWK, decrypt, store in sessionStorage
 * - Recovery flow: use recovery key to decrypt backup, re-encrypt with new passphrase
 * - Key checking: determine if user has encryption keys set up
 * - DEK retrieval: get the document encryption key for a document
 * - DEK sharing: encrypt DEK with recipient's public key
 */





class PassphraseManager {
    /**
     * Check if the user has set up encryption keys on the server.
     */
    static async hasEncryptionKeys() {
        try {
            const data = await (0,_common__rspack_import_0.getJson)("/api/user/encryption_key/")
            return data.has_key === true
        } catch (_e) {
            return false
        }
    }

    /**
     * Check if the master key and private key are in sessionStorage.
     */
    static hasKeysInSession() {
        return _passphrase_crypto__rspack_import_2.PassphraseCrypto.hasKeysInSession()
    }

    /**
     * Get keys from sessionStorage.
     * Returns {masterKey, privateKey} or {masterKey: null, privateKey: null}
     */
    static getKeysFromSession() {
        return _passphrase_crypto__rspack_import_2.PassphraseCrypto.getKeysFromSession()
    }

    /**
     * Clear keys from sessionStorage (e.g., on sign-out).
     */
    static clearKeysFromSession() {
        _passphrase_crypto__rspack_import_2.PassphraseCrypto.clearKeysFromSession()
    }

    /**
     * Set up encryption keys for the first time.
     *
     * @param {string} passphrase - The user's chosen passphrase
     * @returns {Promise<Object>} {recoveryKey: string} - The recovery key to display
     */
    static async setupEncryption(passphrase) {
        // 1. Generate keys
        const masterKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateMasterKey()
        const keyPair = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateKeyPair()
        const recoveryKey = _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateRecoveryKey()
        const salt = _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateSalt()

        // 2. Derive KWK from passphrase
        const kwk = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.deriveKWK(passphrase, salt)

        // 3. Encrypt master key and private key with KWK
        const encryptedMasterKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptKey(
            masterKey,
            kwk
        )
        const encryptedPrivateKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptPrivateKey(
            keyPair.privateKey,
            kwk
        )

        // 4. Encrypt backup of master key with recovery key
        const recoveryKeyRaw = _passphrase_crypto__rspack_import_2.PassphraseCrypto._hexToBytes(recoveryKey)
        const recoveryKeyCryptoKey = await crypto.subtle.importKey(
            "raw",
            recoveryKeyRaw,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        )
        const encryptedMasterKeyBackup = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptKey(
            masterKey,
            recoveryKeyCryptoKey
        )

        // 5. Export public key as JWK
        const publicKeyJwk = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.exportPublicKey(
            keyPair.publicKey
        )

        // 6. Send to server
        const saveData = {
            data: JSON.stringify({
                public_key: publicKeyJwk,
                encrypted_master_key: encryptedMasterKey,
                encrypted_private_key: encryptedPrivateKey,
                user_salt: _passphrase_crypto__rspack_import_2.PassphraseCrypto._bytesToBase64(salt),
                user_iterations: 600000,
                encrypted_master_key_backup: encryptedMasterKeyBackup
            })
        }
        const {status} = await (0,_common__rspack_import_0.jsonPostJson)(
            "/api/user/encryption_key/save/",
            saveData
        )
        if (status >= 400) {
            throw new Error("Failed to save encryption keys")
        }

        // 7. Store in sessionStorage
        await _passphrase_crypto__rspack_import_2.PassphraseCrypto.storeKeysInSession(masterKey, keyPair.privateKey)

        return {recoveryKey}
    }

    /**
     * Unlock encryption keys using the passphrase.
     *
     * @param {string} passphrase - The user's passphrase
     * @returns {Promise<boolean>} true if successful
     */
    static async unlockWithPassphrase(passphrase) {
        // 1. Fetch encrypted keys from server
        const data = await (0,_common__rspack_import_0.getJson)("/api/user/encryption_key/")
        if (!data.has_key) {
            throw new Error("No encryption keys found")
        }

        // 2. Derive KWK
        const salt = _passphrase_crypto__rspack_import_2.PassphraseCrypto._base64ToBytes(data.user_salt)
        const kwk = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.deriveKWK(
            passphrase,
            salt,
            data.user_iterations
        )

        // 3. Decrypt master key and private key
        const masterKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.decryptKey(
            data.encrypted_master_key,
            kwk
        )
        const privateKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.decryptPrivateKey(
            data.encrypted_private_key,
            kwk
        )

        // 4. Store in sessionStorage
        await _passphrase_crypto__rspack_import_2.PassphraseCrypto.storeKeysInSession(masterKey, privateKey)

        return true
    }

    /**
     * Change the passphrase without rotating keys.
     *
     * @param {string} oldPassphrase - Current passphrase
     * @param {string} newPassphrase - New passphrase
     * @returns {Promise<boolean>} true if successful
     */
    static async changePassphrase(oldPassphrase, newPassphrase) {
        // 1. Fetch encrypted keys from server
        const data = await (0,_common__rspack_import_0.getJson)("/api/user/encryption_key/")
        if (!data.has_key) {
            throw new Error("No encryption keys found")
        }

        // 2. Derive old KWK and decrypt keys
        const oldSalt = _passphrase_crypto__rspack_import_2.PassphraseCrypto._base64ToBytes(data.user_salt)
        const oldKwk = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.deriveKWK(
            oldPassphrase,
            oldSalt,
            data.user_iterations
        )
        const masterKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.decryptKey(
            data.encrypted_master_key,
            oldKwk
        )
        const privateKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.decryptPrivateKey(
            data.encrypted_private_key,
            oldKwk
        )

        // 3. Generate new salt and derive new KWK
        const newSalt = _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateSalt()
        const newKwk = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.deriveKWK(newPassphrase, newSalt)

        // 4. Re-encrypt master key and private key with new KWK
        const encryptedMasterKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptKey(
            masterKey,
            newKwk
        )
        const encryptedPrivateKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptPrivateKey(
            privateKey,
            newKwk
        )

        // 5. Re-encrypt master key backup with existing recovery key
        // (We keep the same recovery key so the user doesn't need to update
        // their stored backup. The backup is encrypted with the recovery key,
        // not the passphrase, so it remains valid.)
        const encryptedMasterKeyBackup = data.encrypted_master_key_backup

        // 6. Send updated keys to server
        const saveData = {
            data: JSON.stringify({
                public_key: data.public_key,
                encrypted_master_key: encryptedMasterKey,
                encrypted_private_key: encryptedPrivateKey,
                user_salt: _passphrase_crypto__rspack_import_2.PassphraseCrypto._bytesToBase64(newSalt),
                user_iterations: 600000,
                encrypted_master_key_backup: encryptedMasterKeyBackup
            })
        }
        const {status} = await (0,_common__rspack_import_0.jsonPostJson)(
            "/api/user/encryption_key/save/",
            saveData
        )
        if (status >= 400) {
            throw new Error("Failed to save updated encryption keys")
        }

        // 7. Update sessionStorage
        await _passphrase_crypto__rspack_import_2.PassphraseCrypto.storeKeysInSession(masterKey, privateKey)

        return true
    }

    /**
     * Recover encryption keys using the recovery key.
     *
     * @param {string} recoveryKey - The recovery key (hex string)
     * @param {string} newPassphrase - The new passphrase to set
     * @returns {Promise<Object>} {newRecoveryKey: string}
     */
    static async recoverWithRecoveryKey(recoveryKey, newPassphrase) {
        // 1. Fetch encrypted keys from server
        const data = await (0,_common__rspack_import_0.getJson)("/api/user/encryption_key/")
        if (!data.has_key) {
            throw new Error("No encryption keys found")
        }

        // 2. Decrypt master key backup with recovery key
        const recoveryKeyRaw = _passphrase_crypto__rspack_import_2.PassphraseCrypto._hexToBytes(recoveryKey)
        const recoveryKeyCryptoKey = await crypto.subtle.importKey(
            "raw",
            recoveryKeyRaw,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        )
        const masterKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.decryptKey(
            data.encrypted_master_key_backup,
            recoveryKeyCryptoKey
        )

        // 3. Generate new key pair
        const newKeyPair = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateKeyPair()
        const newRecoveryKey = _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateRecoveryKey()
        const newSalt = _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateSalt()

        // 4. Derive new KWK from new passphrase
        const newKwk = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.deriveKWK(newPassphrase, newSalt)

        // 5. Re-encrypt master key and new private key
        const encryptedMasterKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptKey(
            masterKey,
            newKwk
        )
        const encryptedPrivateKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptPrivateKey(
            newKeyPair.privateKey,
            newKwk
        )

        // 6. Create new backup
        const newRecoveryKeyRaw = _passphrase_crypto__rspack_import_2.PassphraseCrypto._hexToBytes(newRecoveryKey)
        const newRecoveryKeyCryptoKey = await crypto.subtle.importKey(
            "raw",
            newRecoveryKeyRaw,
            {name: "AES-GCM", length: 256},
            false,
            ["encrypt", "decrypt"]
        )
        const encryptedMasterKeyBackup = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptKey(
            masterKey,
            newRecoveryKeyCryptoKey
        )

        // 7. Export new public key
        const publicKeyJwk = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.exportPublicKey(
            newKeyPair.publicKey
        )

        // 8. Send updated keys to server
        const saveData = {
            data: JSON.stringify({
                public_key: publicKeyJwk,
                encrypted_master_key: encryptedMasterKey,
                encrypted_private_key: encryptedPrivateKey,
                user_salt: _passphrase_crypto__rspack_import_2.PassphraseCrypto._bytesToBase64(newSalt),
                user_iterations: 600000,
                encrypted_master_key_backup: encryptedMasterKeyBackup
            })
        }
        const {status} = await (0,_common__rspack_import_0.jsonPostJson)(
            "/api/user/encryption_key/save/",
            saveData
        )
        if (status >= 400) {
            throw new Error("Failed to save updated encryption keys")
        }

        // 9. Store in sessionStorage
        await _passphrase_crypto__rspack_import_2.PassphraseCrypto.storeKeysInSession(
            masterKey,
            newKeyPair.privateKey
        )

        return {newRecoveryKey}
    }

    /**
     * Get the document password for a document.
     *
     * If encrypted with the user's master key, decrypts it directly.
     * If encrypted with the user's public key, decrypts with private key and
     * upgrades to master-key encryption.
     *
     * @param {number} documentId - The document ID
     * @returns {Promise<string|null>} The document password, or null if not available
     */
    static async getDocumentPassword(documentId) {
        const {masterKey, privateKey} =
            await _passphrase_crypto__rspack_import_2.PassphraseCrypto.getKeysFromSession()
        if (!masterKey || !privateKey) {
            return null
        }

        const {json} = await (0,_common__rspack_import_0.jsonPostJson)("/api/document/encryption_key/get/", {
            document_id: documentId
        })
        if (!json.has_key) {
            return null
        }

        let password
        if (json.encrypted_with_master_key) {
            password = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.decryptString(
                json.encrypted_key,
                masterKey
            )
        } else {
            const parts = json.encrypted_key.split(":")
            if (parts.length !== 2) {
                return null
            }
            password = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.decryptStringWithPrivateKey(
                parts[1],
                parts[0],
                privateKey
            )
            // Upgrade to master-key encryption for next time
            const upgradedEncryptedPassword =
                await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptString(password, masterKey)
            await (0,_common__rspack_import_0.jsonPostJson)("/api/document/encryption_key/update/", {
                id: json.id,
                encrypted_key: upgradedEncryptedPassword,
                encrypted_with_master_key: true
            })
        }

        return password
    }

    /**
     * Create or store a document password for a document.
     *
     * Used when:
     * - Creating a new encrypted document (owner's password encrypted with MK)
     * - Sharing with another passphrase user (password encrypted with their public key)
     *
     * @param {number} documentId - The document ID
     * @param {string} password - The document password
     * @param {number} holderId - The user ID to store the password for (default: current user)
     * @param {string} holderType - "user" or "userinvite"
     * @param {boolean} encryptedWithMasterKey - Whether to encrypt with MK or public key
     * @returns {Promise<Object>} Server response
     */
    static async saveDocumentPassword(
        documentId,
        password,
        holderId = null,
        _holderType = "user",
        encryptedWithMasterKey = true
    ) {
        let encryptedKey
        if (encryptedWithMasterKey) {
            const {masterKey} = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.getKeysFromSession()
            if (!masterKey) {
                throw new Error("Master key not available in session")
            }
            encryptedKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptString(
                password,
                masterKey
            )
        } else {
            const pkJson = await (0,_common__rspack_import_0.getJson)(
                `/api/user/encryption_public_key/${holderId}/`
            )
            if (!pkJson.has_key) {
                throw new Error("Recipient has not set up encryption")
            }
            const recipientPublicKey = await _passphrase_crypto__rspack_import_2.PassphraseCrypto.importPublicKey(
                pkJson.public_key
            )
            const encryptedData =
                await _passphrase_crypto__rspack_import_2.PassphraseCrypto.encryptStringWithPublicKey(
                    password,
                    recipientPublicKey
                )
            encryptedKey = `${encryptedData.ephemeralPublicKeyJwk}:${encryptedData.encryptedData}`
        }

        const saveData = {
            document_id: documentId,
            encrypted_key: encryptedKey,
            encrypted_with_master_key: encryptedWithMasterKey
        }
        if (holderId) {
            saveData.holder_id = holderId
        }
        const {json, status} = await (0,_common__rspack_import_0.jsonPostJson)(
            "/api/document/encryption_key/save/",
            saveData
        )
        if (status >= 400) {
            throw new Error("Failed to save document password")
        }
        return json
    }

    /**
     * Generate a new random document password that is itself a valid raw DEK.
     * Returns a 44-character base64-encoded 32-byte AES key.
     */
    static generateDocumentPassword() {
        return _passphrase_crypto__rspack_import_2.PassphraseCrypto.generateDocumentPassword()
    }

    /**
     * Resolve a document password to an AES-GCM key.
     * If the password is a raw DEK (43/44 char base64), use it directly.
     * Otherwise, derive the key via PBKDF2.
     */
    static resolvePasswordToKey(password, salt, iterations) {
        return _key_manager__rspack_import_1.E2EEKeyManager.resolvePasswordToKey(password, salt, iterations)
    }

    /**
     * Check if a user has set up encryption keys (for sharing).
     */
    static async userHasEncryptionKeys(userId) {
        try {
            const data = await (0,_common__rspack_import_0.getJson)(
                `/api/user/encryption_public_key/${userId}/`
            )
            return data.has_key === true
        } catch (_e) {
            return false
        }
    }

    /**
     * Check if user has dismissed the passphrase setup offer.
     */
    static async hasUserDismissedPassphraseOffer() {
        try {
            const data = await (0,_common__rspack_import_0.getJson)("/api/user/preferences/get/")
            return data.preferences?.has_dismissed_passphrase_offer === true
        } catch (_e) {
            return false
        }
    }

    /**
     * Mark that user has dismissed the passphrase setup offer.
     */
    static async markPassphraseDismissed() {
        try {
            await (0,_common__rspack_import_0.jsonPost)("/api/user/preferences/update/", {
                has_dismissed_passphrase_offer: true
            })
        } catch (_e) {
            // Silently fail - preference saving is best-effort
        }
    }
}


}),

}]);