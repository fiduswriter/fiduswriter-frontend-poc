#!/usr/bin/env bash
set -euo pipefail

# update-from-source.sh
# Copies the latest frontend build output from a Fidus Writer source tree
# into this proof-of-concept repository.
#
# Usage:
#   ./update-from-source.sh /path/to/fiduswriter
#
# The path should point to the directory that contains static-transpile/ and
# static-collected/ (typically fiduswriter/fiduswriter inside the repo).

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="${1:-}"

if [ -z "$SOURCE_DIR" ]; then
    echo "Usage: $0 <path-to-fiduswriter-source>"
    echo ""
    echo "Example:"
    echo "  $0 ../fiduswriter/fiduswriter"
    exit 1
fi

if [ ! -d "$SOURCE_DIR/static-transpile" ] || [ ! -d "$SOURCE_DIR/static-collected" ]; then
    echo "Error: '$SOURCE_DIR' does not look like a Fidus Writer build directory."
    echo "Expected to find 'static-transpile/' and 'static-collected/' inside it."
    exit 1
fi

echo "Updating from: $SOURCE_DIR"

# ------------------------------------------------------------------
# 1. Copy latest JS bundles from static-transpile
# ------------------------------------------------------------------
echo "Copying JS bundles..."
mkdir -p "$SCRIPT_DIR/static/js"
rm -rf "$SCRIPT_DIR/static/js/*"
cp -r "$SOURCE_DIR/static-transpile/js/"* "$SCRIPT_DIR/static/js/"

# ------------------------------------------------------------------
# 2. Copy other static assets from static-collected
# ------------------------------------------------------------------
echo "Copying CSS, fonts, images, and other assets..."

for subdir in css fonts img json ogg svg zip; do
    if [ -d "$SOURCE_DIR/static-collected/$subdir" ]; then
        rm -rf "$SCRIPT_DIR/static/$subdir"
        cp -r "$SOURCE_DIR/static-collected/$subdir" "$SCRIPT_DIR/static/"
    fi
done

# ------------------------------------------------------------------
# 3. Detect the new build version hash and update index.html
# ------------------------------------------------------------------
# The hash is hardcoded inside app.js in __webpack_require__.u as:
#   return "" + chunkId + "-1778362862.js"
NEW_VERSION=$(grep -oP '__webpack_require__\.u = function\(chunkId\) \{[^}]+\-\\K[0-9]{10}(?=\.js")' "$SCRIPT_DIR/static/js/app.js" || true)

if [ -z "$NEW_VERSION" ]; then
    # Fallback: extract from a known chunk filename like editor-XXXXXXXXXX.js
    NEW_VERSION=$(ls "$SCRIPT_DIR/static/js/" | grep -oE '\-[0-9]{10}\.js$' | grep -oE '[0-9]{10}' | sort -u | head -1 || true)
fi

if [ -z "$NEW_VERSION" ]; then
    echo "Warning: could not detect version hash from app.js or chunk filenames."
    echo "You may need to update the version manually in index.html."
else
    CURRENT_VERSION=$(grep -oE 'content="[0-9]{10}"' "$SCRIPT_DIR/index.html" | head -1 | tr -d 'content="' || true)

    if [ "$NEW_VERSION" != "$CURRENT_VERSION" ]; then
        echo "Updating version hash: ${CURRENT_VERSION:-<none>} -> $NEW_VERSION"
        sed -i "s/content=\"[0-9]\{10\}\"/content=\"$NEW_VERSION\"/g" "$SCRIPT_DIR/index.html"
        sed -i "s/VERSION: \"[0-9]\{10\}\"/VERSION: \"$NEW_VERSION\"/g" "$SCRIPT_DIR/index.html"
    else
        echo "Version hash unchanged: $NEW_VERSION"
    fi
fi

# ------------------------------------------------------------------
# 4. Report
# ------------------------------------------------------------------
echo ""
echo "Update complete."
echo ""
echo "Next steps:"
echo "  1. Review index.html if the main app's app.html template changed"
echo "     (new CSS links, new script tags, etc.)."
echo "  2. Test the POC: npm start"
echo "  3. Commit the changes: git add -A && git commit -m 'Update frontend'"
