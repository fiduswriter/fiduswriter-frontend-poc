// @ts-ignore
try {
  self['workbox:core:7.3.0'] && _();
} catch (e) {}

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Claim any currently available clients once the service worker
 * becomes active. This is normally used in conjunction with `skipWaiting()`.
 *
 * @memberof workbox-core
 */
function clientsClaim() {
  self.addEventListener('activate', () => self.clients.claim());
}

/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const logger = (() => {
  // Don't overwrite this value if it's already set.
  // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
  if (!('__WB_DISABLE_DEV_LOGS' in globalThis)) {
    self.__WB_DISABLE_DEV_LOGS = false;
  }
  let inGroup = false;
  const methodToColorMap = {
    debug: `#7f8c8d`,
    log: `#2ecc71`,
    warn: `#f39c12`,
    error: `#c0392b`,
    groupCollapsed: `#3498db`,
    groupEnd: null // No colored prefix on groupEnd
  };
  const print = function (method, args) {
    if (self.__WB_DISABLE_DEV_LOGS) {
      return;
    }
    if (method === 'groupCollapsed') {
      // Safari doesn't print all console.groupCollapsed() arguments:
      // https://bugs.webkit.org/show_bug.cgi?id=182754
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        console[method](...args);
        return;
      }
    }
    const styles = [`background: ${methodToColorMap[method]}`, `border-radius: 0.5em`, `color: white`, `font-weight: bold`, `padding: 2px 0.5em`];
    // When in a group, the workbox prefix is not displayed.
    const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
    console[method](...logPrefix, ...args);
    if (method === 'groupCollapsed') {
      inGroup = true;
    }
    if (method === 'groupEnd') {
      inGroup = false;
    }
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  const api = {};
  const loggerMethods = Object.keys(methodToColorMap);
  for (const key of loggerMethods) {
    const method = key;
    api[method] = (...args) => {
      print(method, args);
    };
  }
  return api;
})();

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const messages = {
  'invalid-value': ({
    paramName,
    validValueDescription,
    value
  }) => {
    if (!paramName || !validValueDescription) {
      throw new Error(`Unexpected input to 'invalid-value' error.`);
    }
    return `The '${paramName}' parameter was given a value with an ` + `unexpected value. ${validValueDescription} Received a value of ` + `${JSON.stringify(value)}.`;
  },
  'not-an-array': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    if (!moduleName || !className || !funcName || !paramName) {
      throw new Error(`Unexpected input to 'not-an-array' error.`);
    }
    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className}.${funcName}()' must be an array.`;
  },
  'incorrect-type': ({
    expectedType,
    paramName,
    moduleName,
    className,
    funcName
  }) => {
    if (!expectedType || !paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-type' error.`);
    }
    const classNameStr = className ? `${className}.` : '';
    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${classNameStr}` + `${funcName}()' must be of type ${expectedType}.`;
  },
  'incorrect-class': ({
    expectedClassName,
    paramName,
    moduleName,
    className,
    funcName,
    isReturnValueProblem
  }) => {
    if (!expectedClassName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-class' error.`);
    }
    const classNameStr = className ? `${className}.` : '';
    if (isReturnValueProblem) {
      return `The return value from ` + `'${moduleName}.${classNameStr}${funcName}()' ` + `must be an instance of class ${expectedClassName}.`;
    }
    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${classNameStr}${funcName}()' ` + `must be an instance of class ${expectedClassName}.`;
  },
  'missing-a-method': ({
    expectedMethod,
    paramName,
    moduleName,
    className,
    funcName
  }) => {
    if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
      throw new Error(`Unexpected input to 'missing-a-method' error.`);
    }
    return `${moduleName}.${className}.${funcName}() expected the ` + `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
  },
  'add-to-cache-list-unexpected-type': ({
    entry
  }) => {
    return `An unexpected entry was passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` + `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` + `strings with one or more characters, objects with a url property or ` + `Request objects.`;
  },
  'add-to-cache-list-conflicting-entries': ({
    firstEntry,
    secondEntry
  }) => {
    if (!firstEntry || !secondEntry) {
      throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
    }
    return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${firstEntry} but different revision details. Workbox is ` + `unable to cache and version the asset correctly. Please remove one ` + `of the entries.`;
  },
  'plugin-error-request-will-fetch': ({
    thrownErrorMessage
  }) => {
    if (!thrownErrorMessage) {
      throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
    }
    return `An error was thrown by a plugins 'requestWillFetch()' method. ` + `The thrown error message was: '${thrownErrorMessage}'.`;
  },
  'invalid-cache-name': ({
    cacheNameId,
    value
  }) => {
    if (!cacheNameId) {
      throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
    }
    return `You must provide a name containing at least one character for ` + `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` + `'${JSON.stringify(value)}'`;
  },
  'unregister-route-but-not-found-with-method': ({
    method
  }) => {
    if (!method) {
      throw new Error(`Unexpected input to ` + `'unregister-route-but-not-found-with-method' error.`);
    }
    return `The route you're trying to unregister was not  previously ` + `registered for the method type '${method}'.`;
  },
  'unregister-route-route-not-registered': () => {
    return `The route you're trying to unregister was not previously ` + `registered.`;
  },
  'queue-replay-failed': ({
    name
  }) => {
    return `Replaying the background sync queue '${name}' failed.`;
  },
  'duplicate-queue-name': ({
    name
  }) => {
    return `The Queue name '${name}' is already being used. ` + `All instances of backgroundSync.Queue must be given unique names.`;
  },
  'expired-test-without-max-age': ({
    methodName,
    paramName
  }) => {
    return `The '${methodName}()' method can only be used when the ` + `'${paramName}' is used in the constructor.`;
  },
  'unsupported-route-type': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    return `The supplied '${paramName}' parameter was an unsupported type. ` + `Please check the docs for ${moduleName}.${className}.${funcName} for ` + `valid input types.`;
  },
  'not-array-of-class': ({
    value,
    expectedClass,
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    return `The supplied '${paramName}' parameter must be an array of ` + `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` + `Please check the call to ${moduleName}.${className}.${funcName}() ` + `to fix the issue.`;
  },
  'max-entries-or-age-required': ({
    moduleName,
    className,
    funcName
  }) => {
    return `You must define either config.maxEntries or config.maxAgeSeconds` + `in ${moduleName}.${className}.${funcName}`;
  },
  'statuses-or-headers-required': ({
    moduleName,
    className,
    funcName
  }) => {
    return `You must define either config.statuses or config.headers` + `in ${moduleName}.${className}.${funcName}`;
  },
  'invalid-string': ({
    moduleName,
    funcName,
    paramName
  }) => {
    if (!paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'invalid-string' error.`);
    }
    return `When using strings, the '${paramName}' parameter must start with ` + `'http' (for cross-origin matches) or '/' (for same-origin matches). ` + `Please see the docs for ${moduleName}.${funcName}() for ` + `more info.`;
  },
  'channel-name-required': () => {
    return `You must provide a channelName to construct a ` + `BroadcastCacheUpdate instance.`;
  },
  'invalid-responses-are-same-args': () => {
    return `The arguments passed into responsesAreSame() appear to be ` + `invalid. Please ensure valid Responses are used.`;
  },
  'expire-custom-caches-only': () => {
    return `You must provide a 'cacheName' property when using the ` + `expiration plugin with a runtime caching strategy.`;
  },
  'unit-must-be-bytes': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
    }
    return `The 'unit' portion of the Range header must be set to 'bytes'. ` + `The Range header provided was "${normalizedRangeHeader}"`;
  },
  'single-range-only': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'single-range-only' error.`);
    }
    return `Multiple ranges are not supported. Please use a  single start ` + `value, and optional end value. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'invalid-range-values': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'invalid-range-values' error.`);
    }
    return `The Range header is missing both start and end values. At least ` + `one of those values is needed. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'no-range-header': () => {
    return `No Range header was found in the Request provided.`;
  },
  'range-not-satisfiable': ({
    size,
    start,
    end
  }) => {
    return `The start (${start}) and end (${end}) values in the Range are ` + `not satisfiable by the cached response, which is ${size} bytes.`;
  },
  'attempt-to-cache-non-get-request': ({
    url,
    method
  }) => {
    return `Unable to cache '${url}' because it is a '${method}' request and ` + `only 'GET' requests can be cached.`;
  },
  'cache-put-with-no-response': ({
    url
  }) => {
    return `There was an attempt to cache '${url}' but the response was not ` + `defined.`;
  },
  'no-response': ({
    url,
    error
  }) => {
    let message = `The strategy could not generate a response for '${url}'.`;
    if (error) {
      message += ` The underlying error is ${error}.`;
    }
    return message;
  },
  'bad-precaching-response': ({
    url,
    status
  }) => {
    return `The precaching request for '${url}' failed` + (status ? ` with an HTTP status of ${status}.` : `.`);
  },
  'non-precached-url': ({
    url
  }) => {
    return `createHandlerBoundToURL('${url}') was called, but that URL is ` + `not precached. Please pass in a URL that is precached instead.`;
  },
  'add-to-cache-list-conflicting-integrities': ({
    url
  }) => {
    return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${url} with different integrity values. Please remove one of them.`;
  },
  'missing-precache-entry': ({
    cacheName,
    url
  }) => {
    return `Unable to find a precached response in ${cacheName} for ${url}.`;
  },
  'cross-origin-copy-response': ({
    origin
  }) => {
    return `workbox-core.copyResponse() can only be used with same-origin ` + `responses. It was passed a response with origin ${origin}.`;
  },
  'opaque-streams-source': ({
    type
  }) => {
    const message = `One of the workbox-streams sources resulted in an ` + `'${type}' response.`;
    if (type === 'opaqueredirect') {
      return `${message} Please do not use a navigation request that results ` + `in a redirect as a source.`;
    }
    return `${message} Please ensure your sources are CORS-enabled.`;
  }
};

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const generatorFunction = (code, details = {}) => {
  const message = messages[code];
  if (!message) {
    throw new Error(`Unable to find message for code '${code}'.`);
  }
  return message(details);
};
const messageGenerator = generatorFunction;

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */
class WorkboxError extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(errorCode, details) {
    const message = messageGenerator(errorCode, details);
    super(message);
    this.name = errorCode;
    this.details = details;
  }
}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */
const isArray = (value, details) => {
  if (!Array.isArray(value)) {
    throw new WorkboxError('not-an-array', details);
  }
};
const hasMethod = (object, expectedMethod, details) => {
  const type = typeof object[expectedMethod];
  if (type !== 'function') {
    details['expectedMethod'] = expectedMethod;
    throw new WorkboxError('missing-a-method', details);
  }
};
const isType = (object, expectedType, details) => {
  if (typeof object !== expectedType) {
    details['expectedType'] = expectedType;
    throw new WorkboxError('incorrect-type', details);
  }
};
const isInstance = (object,
// Need the general type to do the check later.
// eslint-disable-next-line @typescript-eslint/ban-types
expectedClass, details) => {
  if (!(object instanceof expectedClass)) {
    details['expectedClassName'] = expectedClass.name;
    throw new WorkboxError('incorrect-class', details);
  }
};
const isOneOf = (value, validValues, details) => {
  if (!validValues.includes(value)) {
    details['validValueDescription'] = `Valid values are ${JSON.stringify(validValues)}.`;
    throw new WorkboxError('invalid-value', details);
  }
};
const isArrayOfClass = (value,
// Need general type to do check later.
expectedClass,
// eslint-disable-line
details) => {
  const error = new WorkboxError('not-array-of-class', details);
  if (!Array.isArray(value)) {
    throw error;
  }
  for (const item of value) {
    if (!(item instanceof expectedClass)) {
      throw error;
    }
  }
};
const finalAssertExports = {
  hasMethod,
  isArray,
  isInstance,
  isOneOf,
  isType,
  isArrayOfClass
};

// @ts-ignore
try {
  self['workbox:routing:7.3.0'] && _();
} catch (e) {}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */
const defaultMethod = 'GET';
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */
const validMethods = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'];

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
const normalizeHandler = handler => {
  if (handler && typeof handler === 'object') {
    {
      finalAssertExports.hasMethod(handler, 'handle', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'handler'
      });
    }
    return handler;
  } else {
    {
      finalAssertExports.isType(handler, 'function', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'handler'
      });
    }
    return {
      handle: handler
    };
  }
};

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * A `Route` consists of a pair of callback functions, "match" and "handler".
 * The "match" callback determine if a route should be used to "handle" a
 * request by returning a non-falsy value if it can. The "handler" callback
 * is called when there is a match and should return a Promise that resolves
 * to a `Response`.
 *
 * @memberof workbox-routing
 */
class Route {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(match, handler, method = defaultMethod) {
    {
      finalAssertExports.isType(match, 'function', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'match'
      });
      if (method) {
        finalAssertExports.isOneOf(method, validMethods, {
          paramName: 'method'
        });
      }
    }
    // These values are referenced directly by Router so cannot be
    // altered by minificaton.
    this.handler = normalizeHandler(handler);
    this.match = match;
    this.method = method;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(handler) {
    this.catchHandler = normalizeHandler(handler);
  }
}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * RegExpRoute makes it easy to create a regular expression based
 * {@link workbox-routing.Route}.
 *
 * For same-origin requests the RegExp only needs to match part of the URL. For
 * requests against third-party servers, you must define a RegExp that matches
 * the start of the URL.
 *
 * @memberof workbox-routing
 * @extends workbox-routing.Route
 */
class RegExpRoute extends Route {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(regExp, handler, method) {
    {
      finalAssertExports.isInstance(regExp, RegExp, {
        moduleName: 'workbox-routing',
        className: 'RegExpRoute',
        funcName: 'constructor',
        paramName: 'pattern'
      });
    }
    const match = ({
      url
    }) => {
      const result = regExp.exec(url.href);
      // Return immediately if there's no match.
      if (!result) {
        return;
      }
      // Require that the match start at the first character in the URL string
      // if it's a cross-origin request.
      // See https://github.com/GoogleChrome/workbox/issues/281 for the context
      // behind this behavior.
      if (url.origin !== location.origin && result.index !== 0) {
        {
          logger.debug(`The regular expression '${regExp.toString()}' only partially matched ` + `against the cross-origin URL '${url.toString()}'. RegExpRoute's will only ` + `handle cross-origin requests if they match the entire URL.`);
        }
        return;
      }
      // If the route matches, but there aren't any capture groups defined, then
      // this will return [], which is truthy and therefore sufficient to
      // indicate a match.
      // If there are capture groups, then it will return their values.
      return result.slice(1);
    };
    super(match, handler, method);
  }
}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const getFriendlyURL = url => {
  const urlObj = new URL(String(url), location.href);
  // See https://github.com/GoogleChrome/workbox/issues/2323
  // We want to include everything, except for the origin if it's same-origin.
  return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
};

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * The Router can be used to process a `FetchEvent` using one or more
 * {@link workbox-routing.Route}, responding with a `Response` if
 * a matching route exists.
 *
 * If no route matches a given a request, the Router will use a "default"
 * handler if one is defined.
 *
 * Should the matching Route throw an error, the Router will use a "catch"
 * handler if one is defined to gracefully deal with issues and respond with a
 * Request.
 *
 * If a request matches multiple routes, the **earliest** registered route will
 * be used to respond to the request.
 *
 * @memberof workbox-routing
 */
class Router {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = new Map();
    this._defaultHandlerMap = new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('fetch', event => {
      const {
        request
      } = event;
      const responsePromise = this.handleRequest({
        request,
        event
      });
      if (responsePromise) {
        event.respondWith(responsePromise);
      }
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('message', event => {
      // event.data is type 'any'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (event.data && event.data.type === 'CACHE_URLS') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {
          payload
        } = event.data;
        {
          logger.debug(`Caching URLs from the window`, payload.urlsToCache);
        }
        const requestPromises = Promise.all(payload.urlsToCache.map(entry => {
          if (typeof entry === 'string') {
            entry = [entry];
          }
          const request = new Request(...entry);
          return this.handleRequest({
            request,
            event
          });
          // TODO(philipwalton): TypeScript errors without this typecast for
          // some reason (probably a bug). The real type here should work but
          // doesn't: `Array<Promise<Response> | undefined>`.
        })); // TypeScript
        event.waitUntil(requestPromises);
        // If a MessageChannel was used, reply to the message on success.
        if (event.ports && event.ports[0]) {
          void requestPromises.then(() => event.ports[0].postMessage(true));
        }
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({
    request,
    event
  }) {
    {
      finalAssertExports.isInstance(request, Request, {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'handleRequest',
        paramName: 'options.request'
      });
    }
    const url = new URL(request.url, location.href);
    if (!url.protocol.startsWith('http')) {
      {
        logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
      }
      return;
    }
    const sameOrigin = url.origin === location.origin;
    const {
      params,
      route
    } = this.findMatchingRoute({
      event,
      request,
      sameOrigin,
      url
    });
    let handler = route && route.handler;
    const debugMessages = [];
    {
      if (handler) {
        debugMessages.push([`Found a route to handle this request:`, route]);
        if (params) {
          debugMessages.push([`Passing the following params to the route's handler:`, params]);
        }
      }
    }
    // If we don't have a handler because there was no matching route, then
    // fall back to defaultHandler if that's defined.
    const method = request.method;
    if (!handler && this._defaultHandlerMap.has(method)) {
      {
        debugMessages.push(`Failed to find a matching route. Falling ` + `back to the default handler for ${method}.`);
      }
      handler = this._defaultHandlerMap.get(method);
    }
    if (!handler) {
      {
        // No handler so Workbox will do nothing. If logs is set of debug
        // i.e. verbose, we should print out this information.
        logger.debug(`No route found for: ${getFriendlyURL(url)}`);
      }
      return;
    }
    {
      // We have a handler, meaning Workbox is going to handle the route.
      // print the routing details to the console.
      logger.groupCollapsed(`Router is responding to: ${getFriendlyURL(url)}`);
      debugMessages.forEach(msg => {
        if (Array.isArray(msg)) {
          logger.log(...msg);
        } else {
          logger.log(msg);
        }
      });
      logger.groupEnd();
    }
    // Wrap in try and catch in case the handle method throws a synchronous
    // error. It should still callback to the catch handler.
    let responsePromise;
    try {
      responsePromise = handler.handle({
        url,
        request,
        event,
        params
      });
    } catch (err) {
      responsePromise = Promise.reject(err);
    }
    // Get route's catch handler, if it exists
    const catchHandler = route && route.catchHandler;
    if (responsePromise instanceof Promise && (this._catchHandler || catchHandler)) {
      responsePromise = responsePromise.catch(async err => {
        // If there's a route catch handler, process that first
        if (catchHandler) {
          {
            // Still include URL here as it will be async from the console group
            // and may not make sense without the URL
            logger.groupCollapsed(`Error thrown when responding to: ` + ` ${getFriendlyURL(url)}. Falling back to route's Catch Handler.`);
            logger.error(`Error thrown by:`, route);
            logger.error(err);
            logger.groupEnd();
          }
          try {
            return await catchHandler.handle({
              url,
              request,
              event,
              params
            });
          } catch (catchErr) {
            if (catchErr instanceof Error) {
              err = catchErr;
            }
          }
        }
        if (this._catchHandler) {
          {
            // Still include URL here as it will be async from the console group
            // and may not make sense without the URL
            logger.groupCollapsed(`Error thrown when responding to: ` + ` ${getFriendlyURL(url)}. Falling back to global Catch Handler.`);
            logger.error(`Error thrown by:`, route);
            logger.error(err);
            logger.groupEnd();
          }
          return this._catchHandler.handle({
            url,
            request,
            event
          });
        }
        throw err;
      });
    }
    return responsePromise;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({
    url,
    sameOrigin,
    request,
    event
  }) {
    const routes = this._routes.get(request.method) || [];
    for (const route of routes) {
      let params;
      // route.match returns type any, not possible to change right now.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const matchResult = route.match({
        url,
        sameOrigin,
        request,
        event
      });
      if (matchResult) {
        {
          // Warn developers that using an async matchCallback is almost always
          // not the right thing to do.
          if (matchResult instanceof Promise) {
            logger.warn(`While routing ${getFriendlyURL(url)}, an async ` + `matchCallback function was used. Please convert the ` + `following route to use a synchronous matchCallback function:`, route);
          }
        }
        // See https://github.com/GoogleChrome/workbox/issues/2079
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        params = matchResult;
        if (Array.isArray(params) && params.length === 0) {
          // Instead of passing an empty array in as params, use undefined.
          params = undefined;
        } else if (matchResult.constructor === Object &&
        // eslint-disable-line
        Object.keys(matchResult).length === 0) {
          // Instead of passing an empty object in as params, use undefined.
          params = undefined;
        } else if (typeof matchResult === 'boolean') {
          // For the boolean value true (rather than just something truth-y),
          // don't set params.
          // See https://github.com/GoogleChrome/workbox/pull/2134#issuecomment-513924353
          params = undefined;
        }
        // Return early if have a match.
        return {
          route,
          params
        };
      }
    }
    // If no match was found above, return and empty object.
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(handler, method = defaultMethod) {
    this._defaultHandlerMap.set(method, normalizeHandler(handler));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(handler) {
    this._catchHandler = normalizeHandler(handler);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(route) {
    {
      finalAssertExports.isType(route, 'object', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      finalAssertExports.hasMethod(route, 'match', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      finalAssertExports.isType(route.handler, 'object', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      finalAssertExports.hasMethod(route.handler, 'handle', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route.handler'
      });
      finalAssertExports.isType(route.method, 'string', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route.method'
      });
    }
    if (!this._routes.has(route.method)) {
      this._routes.set(route.method, []);
    }
    // Give precedence to all of the earlier routes by adding this additional
    // route to the end of the array.
    this._routes.get(route.method).push(route);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(route) {
    if (!this._routes.has(route.method)) {
      throw new WorkboxError('unregister-route-but-not-found-with-method', {
        method: route.method
      });
    }
    const routeIndex = this._routes.get(route.method).indexOf(route);
    if (routeIndex > -1) {
      this._routes.get(route.method).splice(routeIndex, 1);
    } else {
      throw new WorkboxError('unregister-route-route-not-registered');
    }
  }
}

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
let defaultRouter;
/**
 * Creates a new, singleton Router instance if one does not exist. If one
 * does already exist, that instance is returned.
 *
 * @private
 * @return {Router}
 */
const getOrCreateDefaultRouter = () => {
  if (!defaultRouter) {
    defaultRouter = new Router();
    // The helpers that use the default Router assume these listeners exist.
    defaultRouter.addFetchListener();
    defaultRouter.addCacheListener();
  }
  return defaultRouter;
};

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Easily register a RegExp, string, or function with a caching
 * strategy to a singleton Router instance.
 *
 * This method will generate a Route for you if needed and
 * call {@link workbox-routing.Router#registerRoute}.
 *
 * @param {RegExp|string|workbox-routing.Route~matchCallback|workbox-routing.Route} capture
 * If the capture param is a `Route`, all other arguments will be ignored.
 * @param {workbox-routing~handlerCallback} [handler] A callback
 * function that returns a Promise resulting in a Response. This parameter
 * is required if `capture` is not a `Route` object.
 * @param {string} [method='GET'] The HTTP method to match the Route
 * against.
 * @return {workbox-routing.Route} The generated `Route`.
 *
 * @memberof workbox-routing
 */
function registerRoute(capture, handler, method) {
  let route;
  if (typeof capture === 'string') {
    const captureUrl = new URL(capture, location.href);
    {
      if (!(capture.startsWith('/') || capture.startsWith('http'))) {
        throw new WorkboxError('invalid-string', {
          moduleName: 'workbox-routing',
          funcName: 'registerRoute',
          paramName: 'capture'
        });
      }
      // We want to check if Express-style wildcards are in the pathname only.
      // TODO: Remove this log message in v4.
      const valueToCheck = capture.startsWith('http') ? captureUrl.pathname : capture;
      // See https://github.com/pillarjs/path-to-regexp#parameters
      const wildcards = '[*:?+]';
      if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
        logger.debug(`The '$capture' parameter contains an Express-style wildcard ` + `character (${wildcards}). Strings are now always interpreted as ` + `exact matches; use a RegExp for partial or wildcard matches.`);
      }
    }
    const matchCallback = ({
      url
    }) => {
      {
        if (url.pathname === captureUrl.pathname && url.origin !== captureUrl.origin) {
          logger.debug(`${capture} only partially matches the cross-origin URL ` + `${url.toString()}. This route will only handle cross-origin requests ` + `if they match the entire URL.`);
        }
      }
      return url.href === captureUrl.href;
    };
    // If `capture` is a string then `handler` and `method` must be present.
    route = new Route(matchCallback, handler, method);
  } else if (capture instanceof RegExp) {
    // If `capture` is a `RegExp` then `handler` and `method` must be present.
    route = new RegExpRoute(capture, handler, method);
  } else if (typeof capture === 'function') {
    // If `capture` is a function then `handler` and `method` must be present.
    route = new Route(capture, handler, method);
  } else if (capture instanceof Route) {
    route = capture;
  } else {
    throw new WorkboxError('unsupported-route-type', {
      moduleName: 'workbox-routing',
      funcName: 'registerRoute',
      paramName: 'capture'
    });
  }
  const defaultRouter = getOrCreateDefaultRouter();
  defaultRouter.registerRoute(route);
  return route;
}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const _cacheNameDetails = {
  googleAnalytics: 'googleAnalytics',
  precache: 'precache-v2',
  prefix: 'workbox',
  runtime: 'runtime',
  suffix: typeof registration !== 'undefined' ? registration.scope : ''
};
const _createCacheName = cacheName => {
  return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix].filter(value => value && value.length > 0).join('-');
};
const eachCacheNameDetail = fn => {
  for (const key of Object.keys(_cacheNameDetails)) {
    fn(key);
  }
};
const cacheNames = {
  updateDetails: details => {
    eachCacheNameDetail(key => {
      if (typeof details[key] === 'string') {
        _cacheNameDetails[key] = details[key];
      }
    });
  },
  getGoogleAnalyticsName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
  },
  getPrecacheName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.precache);
  },
  getPrefix: () => {
    return _cacheNameDetails.prefix;
  },
  getRuntimeName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.runtime);
  },
  getSuffix: () => {
    return _cacheNameDetails.suffix;
  }
};

/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * A utility method that makes it easier to use `event.waitUntil` with
 * async functions and return the result.
 *
 * @param {ExtendableEvent} event
 * @param {Function} asyncFn
 * @return {Function}
 * @private
 */
function waitUntil(event, asyncFn) {
  const returnPromise = asyncFn();
  event.waitUntil(returnPromise);
  return returnPromise;
}

// @ts-ignore
try {
  self['workbox:precaching:7.3.0'] && _();
} catch (e) {}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
// Name of the search parameter used to store revision info.
const REVISION_SEARCH_PARAM = '__WB_REVISION__';
/**
 * Converts a manifest entry into a versioned URL suitable for precaching.
 *
 * @param {Object|string} entry
 * @return {string} A URL with versioning info.
 *
 * @private
 * @memberof workbox-precaching
 */
function createCacheKey(entry) {
  if (!entry) {
    throw new WorkboxError('add-to-cache-list-unexpected-type', {
      entry
    });
  }
  // If a precache manifest entry is a string, it's assumed to be a versioned
  // URL, like '/app.abcd1234.js'. Return as-is.
  if (typeof entry === 'string') {
    const urlObject = new URL(entry, location.href);
    return {
      cacheKey: urlObject.href,
      url: urlObject.href
    };
  }
  const {
    revision,
    url
  } = entry;
  if (!url) {
    throw new WorkboxError('add-to-cache-list-unexpected-type', {
      entry
    });
  }
  // If there's just a URL and no revision, then it's also assumed to be a
  // versioned URL.
  if (!revision) {
    const urlObject = new URL(url, location.href);
    return {
      cacheKey: urlObject.href,
      url: urlObject.href
    };
  }
  // Otherwise, construct a properly versioned URL using the custom Workbox
  // search parameter along with the revision info.
  const cacheKeyURL = new URL(url, location.href);
  const originalURL = new URL(url, location.href);
  cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
  return {
    cacheKey: cacheKeyURL.href,
    url: originalURL.href
  };
}

/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * A plugin, designed to be used with PrecacheController, to determine the
 * of assets that were updated (or not updated) during the install event.
 *
 * @private
 */
class PrecacheInstallReportPlugin {
  constructor() {
    this.updatedURLs = [];
    this.notUpdatedURLs = [];
    this.handlerWillStart = async ({
      request,
      state
    }) => {
      // TODO: `state` should never be undefined...
      if (state) {
        state.originalRequest = request;
      }
    };
    this.cachedResponseWillBeUsed = async ({
      event,
      state,
      cachedResponse
    }) => {
      if (event.type === 'install') {
        if (state && state.originalRequest && state.originalRequest instanceof Request) {
          // TODO: `state` should never be undefined...
          const url = state.originalRequest.url;
          if (cachedResponse) {
            this.notUpdatedURLs.push(url);
          } else {
            this.updatedURLs.push(url);
          }
        }
      }
      return cachedResponse;
    };
  }
}

/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * A plugin, designed to be used with PrecacheController, to translate URLs into
 * the corresponding cache key, based on the current revision info.
 *
 * @private
 */
class PrecacheCacheKeyPlugin {
  constructor({
    precacheController
  }) {
    this.cacheKeyWillBeUsed = async ({
      request,
      params
    }) => {
      // Params is type any, can't change right now.
      /* eslint-disable */
      const cacheKey = (params === null || params === void 0 ? void 0 : params.cacheKey) || this._precacheController.getCacheKeyForURL(request.url);
      /* eslint-enable */
      return cacheKey ? new Request(cacheKey, {
        headers: request.headers
      }) : request;
    };
    this._precacheController = precacheController;
  }
}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * @param {string} groupTitle
 * @param {Array<string>} deletedURLs
 *
 * @private
 */
const logGroup = (groupTitle, deletedURLs) => {
  logger.groupCollapsed(groupTitle);
  for (const url of deletedURLs) {
    logger.log(url);
  }
  logger.groupEnd();
};
/**
 * @param {Array<string>} deletedURLs
 *
 * @private
 * @memberof workbox-precaching
 */
function printCleanupDetails(deletedURLs) {
  const deletionCount = deletedURLs.length;
  if (deletionCount > 0) {
    logger.groupCollapsed(`During precaching cleanup, ` + `${deletionCount} cached ` + `request${deletionCount === 1 ? ' was' : 's were'} deleted.`);
    logGroup('Deleted Cache Requests', deletedURLs);
    logger.groupEnd();
  }
}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * @param {string} groupTitle
 * @param {Array<string>} urls
 *
 * @private
 */
function _nestedGroup(groupTitle, urls) {
  if (urls.length === 0) {
    return;
  }
  logger.groupCollapsed(groupTitle);
  for (const url of urls) {
    logger.log(url);
  }
  logger.groupEnd();
}
/**
 * @param {Array<string>} urlsToPrecache
 * @param {Array<string>} urlsAlreadyPrecached
 *
 * @private
 * @memberof workbox-precaching
 */
function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
  const precachedCount = urlsToPrecache.length;
  const alreadyPrecachedCount = urlsAlreadyPrecached.length;
  if (precachedCount || alreadyPrecachedCount) {
    let message = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
    if (alreadyPrecachedCount > 0) {
      message += ` ${alreadyPrecachedCount} ` + `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
    }
    logger.groupCollapsed(message);
    _nestedGroup(`View newly precached URLs.`, urlsToPrecache);
    _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);
    logger.groupEnd();
  }
}

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
let supportStatus;
/**
 * A utility function that determines whether the current browser supports
 * constructing a new `Response` from a `response.body` stream.
 *
 * @return {boolean} `true`, if the current browser can successfully
 *     construct a `Response` from a `response.body` stream, `false` otherwise.
 *
 * @private
 */
function canConstructResponseFromBodyStream() {
  if (supportStatus === undefined) {
    const testResponse = new Response('');
    if ('body' in testResponse) {
      try {
        new Response(testResponse.body);
        supportStatus = true;
      } catch (error) {
        supportStatus = false;
      }
    }
    supportStatus = false;
  }
  return supportStatus;
}

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Allows developers to copy a response and modify its `headers`, `status`,
 * or `statusText` values (the values settable via a
 * [`ResponseInit`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#Syntax}
 * object in the constructor).
 * To modify these values, pass a function as the second argument. That
 * function will be invoked with a single object with the response properties
 * `{headers, status, statusText}`. The return value of this function will
 * be used as the `ResponseInit` for the new `Response`. To change the values
 * either modify the passed parameter(s) and return it, or return a totally
 * new object.
 *
 * This method is intentionally limited to same-origin responses, regardless of
 * whether CORS was used or not.
 *
 * @param {Response} response
 * @param {Function} modifier
 * @memberof workbox-core
 */
async function copyResponse(response, modifier) {
  let origin = null;
  // If response.url isn't set, assume it's cross-origin and keep origin null.
  if (response.url) {
    const responseURL = new URL(response.url);
    origin = responseURL.origin;
  }
  if (origin !== self.location.origin) {
    throw new WorkboxError('cross-origin-copy-response', {
      origin
    });
  }
  const clonedResponse = response.clone();
  // Create a fresh `ResponseInit` object by cloning the headers.
  const responseInit = {
    headers: new Headers(clonedResponse.headers),
    status: clonedResponse.status,
    statusText: clonedResponse.statusText
  };
  // Apply any user modifications.
  const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
  // Create the new response from the body stream and `ResponseInit`
  // modifications. Note: not all browsers support the Response.body stream,
  // so fall back to reading the entire body into memory as a blob.
  const body = canConstructResponseFromBodyStream() ? clonedResponse.body : await clonedResponse.blob();
  return new Response(body, modifiedResponseInit);
}

/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
function stripParams(fullURL, ignoreParams) {
  const strippedURL = new URL(fullURL);
  for (const param of ignoreParams) {
    strippedURL.searchParams.delete(param);
  }
  return strippedURL.href;
}
/**
 * Matches an item in the cache, ignoring specific URL params. This is similar
 * to the `ignoreSearch` option, but it allows you to ignore just specific
 * params (while continuing to match on the others).
 *
 * @private
 * @param {Cache} cache
 * @param {Request} request
 * @param {Object} matchOptions
 * @param {Array<string>} ignoreParams
 * @return {Promise<Response|undefined>}
 */
async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
  const strippedRequestURL = stripParams(request.url, ignoreParams);
  // If the request doesn't include any ignored params, match as normal.
  if (request.url === strippedRequestURL) {
    return cache.match(request, matchOptions);
  }
  // Otherwise, match by comparing keys
  const keysOptions = Object.assign(Object.assign({}, matchOptions), {
    ignoreSearch: true
  });
  const cacheKeys = await cache.keys(request, keysOptions);
  for (const cacheKey of cacheKeys) {
    const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
    if (strippedRequestURL === strippedCacheKeyURL) {
      return cache.match(cacheKey, matchOptions);
    }
  }
  return;
}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * The Deferred class composes Promises in a way that allows for them to be
 * resolved or rejected from outside the constructor. In most cases promises
 * should be used directly, but Deferreds can be necessary when the logic to
 * resolve a promise must be separate.
 *
 * @private
 */
class Deferred {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
// Callbacks to be executed whenever there's a quota error.
// Can't change Function type right now.
// eslint-disable-next-line @typescript-eslint/ban-types
const quotaErrorCallbacks = new Set();

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof workbox-core
 * @private
 */
async function executeQuotaErrorCallbacks() {
  {
    logger.log(`About to run ${quotaErrorCallbacks.size} ` + `callbacks to clean up caches.`);
  }
  for (const callback of quotaErrorCallbacks) {
    await callback();
    {
      logger.log(callback, 'is complete.');
    }
  }
  {
    logger.log('Finished running callbacks.');
  }
}

/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Returns a promise that resolves and the passed number of milliseconds.
 * This utility is an async/await-friendly version of `setTimeout`.
 *
 * @param {number} ms
 * @return {Promise}
 * @private
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// @ts-ignore
try {
  self['workbox:strategies:7.3.0'] && _();
} catch (e) {}

/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
function toRequest(input) {
  return typeof input === 'string' ? new Request(input) : input;
}
/**
 * A class created every time a Strategy instance calls
 * {@link workbox-strategies.Strategy~handle} or
 * {@link workbox-strategies.Strategy~handleAll} that wraps all fetch and
 * cache actions around plugin callbacks and keeps track of when the strategy
 * is "done" (i.e. all added `event.waitUntil()` promises have resolved).
 *
 * @memberof workbox-strategies
 */
class StrategyHandler {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(strategy, options) {
    this._cacheKeys = {};
    /**
     * The request the strategy is performing (passed to the strategy's
     * `handle()` or `handleAll()` method).
     * @name request
     * @instance
     * @type {Request}
     * @memberof workbox-strategies.StrategyHandler
     */
    /**
     * The event associated with this request.
     * @name event
     * @instance
     * @type {ExtendableEvent}
     * @memberof workbox-strategies.StrategyHandler
     */
    /**
     * A `URL` instance of `request.url` (if passed to the strategy's
     * `handle()` or `handleAll()` method).
     * Note: the `url` param will be present if the strategy was invoked
     * from a workbox `Route` object.
     * @name url
     * @instance
     * @type {URL|undefined}
     * @memberof workbox-strategies.StrategyHandler
     */
    /**
     * A `param` value (if passed to the strategy's
     * `handle()` or `handleAll()` method).
     * Note: the `param` param will be present if the strategy was invoked
     * from a workbox `Route` object and the
     * {@link workbox-routing~matchCallback} returned
     * a truthy value (it will be that value).
     * @name params
     * @instance
     * @type {*|undefined}
     * @memberof workbox-strategies.StrategyHandler
     */
    {
      finalAssertExports.isInstance(options.event, ExtendableEvent, {
        moduleName: 'workbox-strategies',
        className: 'StrategyHandler',
        funcName: 'constructor',
        paramName: 'options.event'
      });
    }
    Object.assign(this, options);
    this.event = options.event;
    this._strategy = strategy;
    this._handlerDeferred = new Deferred();
    this._extendLifetimePromises = [];
    // Copy the plugins list (since it's mutable on the strategy),
    // so any mutations don't affect this handler instance.
    this._plugins = [...strategy.plugins];
    this._pluginStateMap = new Map();
    for (const plugin of this._plugins) {
      this._pluginStateMap.set(plugin, {});
    }
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(input) {
    const {
      event
    } = this;
    let request = toRequest(input);
    if (request.mode === 'navigate' && event instanceof FetchEvent && event.preloadResponse) {
      const possiblePreloadResponse = await event.preloadResponse;
      if (possiblePreloadResponse) {
        {
          logger.log(`Using a preloaded navigation response for ` + `'${getFriendlyURL(request.url)}'`);
        }
        return possiblePreloadResponse;
      }
    }
    // If there is a fetchDidFail plugin, we need to save a clone of the
    // original request before it's either modified by a requestWillFetch
    // plugin or before the original request's body is consumed via fetch().
    const originalRequest = this.hasCallback('fetchDidFail') ? request.clone() : null;
    try {
      for (const cb of this.iterateCallbacks('requestWillFetch')) {
        request = await cb({
          request: request.clone(),
          event
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new WorkboxError('plugin-error-request-will-fetch', {
          thrownErrorMessage: err.message
        });
      }
    }
    // The request can be altered by plugins with `requestWillFetch` making
    // the original request (most likely from a `fetch` event) different
    // from the Request we make. Pass both to `fetchDidFail` to aid debugging.
    const pluginFilteredRequest = request.clone();
    try {
      let fetchResponse;
      // See https://github.com/GoogleChrome/workbox/issues/1796
      fetchResponse = await fetch(request, request.mode === 'navigate' ? undefined : this._strategy.fetchOptions);
      if ("development" !== 'production') {
        logger.debug(`Network request for ` + `'${getFriendlyURL(request.url)}' returned a response with ` + `status '${fetchResponse.status}'.`);
      }
      for (const callback of this.iterateCallbacks('fetchDidSucceed')) {
        fetchResponse = await callback({
          event,
          request: pluginFilteredRequest,
          response: fetchResponse
        });
      }
      return fetchResponse;
    } catch (error) {
      {
        logger.log(`Network request for ` + `'${getFriendlyURL(request.url)}' threw an error.`, error);
      }
      // `originalRequest` will only exist if a `fetchDidFail` callback
      // is being used (see above).
      if (originalRequest) {
        await this.runCallbacks('fetchDidFail', {
          error: error,
          event,
          originalRequest: originalRequest.clone(),
          request: pluginFilteredRequest.clone()
        });
      }
      throw error;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(input) {
    const response = await this.fetch(input);
    const responseClone = response.clone();
    void this.waitUntil(this.cachePut(input, responseClone));
    return response;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillBeUsed()
   * - cachedResponseWillBeUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(key) {
    const request = toRequest(key);
    let cachedResponse;
    const {
      cacheName,
      matchOptions
    } = this._strategy;
    const effectiveRequest = await this.getCacheKey(request, 'read');
    const multiMatchOptions = Object.assign(Object.assign({}, matchOptions), {
      cacheName
    });
    cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
    {
      if (cachedResponse) {
        logger.debug(`Found a cached response in '${cacheName}'.`);
      } else {
        logger.debug(`No cached response found in '${cacheName}'.`);
      }
    }
    for (const callback of this.iterateCallbacks('cachedResponseWillBeUsed')) {
      cachedResponse = (await callback({
        cacheName,
        matchOptions,
        cachedResponse,
        request: effectiveRequest,
        event: this.event
      })) || undefined;
    }
    return cachedResponse;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillBeUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(key, response) {
    const request = toRequest(key);
    // Run in the next task to avoid blocking other cache reads.
    // https://github.com/w3c/ServiceWorker/issues/1397
    await timeout(0);
    const effectiveRequest = await this.getCacheKey(request, 'write');
    {
      if (effectiveRequest.method && effectiveRequest.method !== 'GET') {
        throw new WorkboxError('attempt-to-cache-non-get-request', {
          url: getFriendlyURL(effectiveRequest.url),
          method: effectiveRequest.method
        });
      }
      // See https://github.com/GoogleChrome/workbox/issues/2818
      const vary = response.headers.get('Vary');
      if (vary) {
        logger.debug(`The response for ${getFriendlyURL(effectiveRequest.url)} ` + `has a 'Vary: ${vary}' header. ` + `Consider setting the {ignoreVary: true} option on your strategy ` + `to ensure cache matching and deletion works as expected.`);
      }
    }
    if (!response) {
      {
        logger.error(`Cannot cache non-existent response for ` + `'${getFriendlyURL(effectiveRequest.url)}'.`);
      }
      throw new WorkboxError('cache-put-with-no-response', {
        url: getFriendlyURL(effectiveRequest.url)
      });
    }
    const responseToCache = await this._ensureResponseSafeToCache(response);
    if (!responseToCache) {
      {
        logger.debug(`Response '${getFriendlyURL(effectiveRequest.url)}' ` + `will not be cached.`, responseToCache);
      }
      return false;
    }
    const {
      cacheName,
      matchOptions
    } = this._strategy;
    const cache = await self.caches.open(cacheName);
    const hasCacheUpdateCallback = this.hasCallback('cacheDidUpdate');
    const oldResponse = hasCacheUpdateCallback ? await cacheMatchIgnoreParams(
    // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
    // feature. Consider into ways to only add this behavior if using
    // precaching.
    cache, effectiveRequest.clone(), ['__WB_REVISION__'], matchOptions) : null;
    {
      logger.debug(`Updating the '${cacheName}' cache with a new Response ` + `for ${getFriendlyURL(effectiveRequest.url)}.`);
    }
    try {
      await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
    } catch (error) {
      if (error instanceof Error) {
        // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
        if (error.name === 'QuotaExceededError') {
          await executeQuotaErrorCallbacks();
        }
        throw error;
      }
    }
    for (const callback of this.iterateCallbacks('cacheDidUpdate')) {
      await callback({
        cacheName,
        oldResponse,
        newResponse: responseToCache.clone(),
        request: effectiveRequest,
        event: this.event
      });
    }
    return true;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(request, mode) {
    const key = `${request.url} | ${mode}`;
    if (!this._cacheKeys[key]) {
      let effectiveRequest = request;
      for (const callback of this.iterateCallbacks('cacheKeyWillBeUsed')) {
        effectiveRequest = toRequest(await callback({
          mode,
          request: effectiveRequest,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params // eslint-disable-line
        }));
      }
      this._cacheKeys[key] = effectiveRequest;
    }
    return this._cacheKeys[key];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(name) {
    for (const plugin of this._strategy.plugins) {
      if (name in plugin) {
        return true;
      }
    }
    return false;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(name, param) {
    for (const callback of this.iterateCallbacks(name)) {
      // TODO(philipwalton): not sure why `any` is needed. It seems like
      // this should work with `as WorkboxPluginCallbackParam[C]`.
      await callback(param);
    }
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(name) {
    for (const plugin of this._strategy.plugins) {
      if (typeof plugin[name] === 'function') {
        const state = this._pluginStateMap.get(plugin);
        const statefulCallback = param => {
          const statefulParam = Object.assign(Object.assign({}, param), {
            state
          });
          // TODO(philipwalton): not sure why `any` is needed. It seems like
          // this should work with `as WorkboxPluginCallbackParam[C]`.
          return plugin[name](statefulParam);
        };
        yield statefulCallback;
      }
    }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(promise) {
    this._extendLifetimePromises.push(promise);
    return promise;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread may be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    while (this._extendLifetimePromises.length) {
      const promises = this._extendLifetimePromises.splice(0);
      const result = await Promise.allSettled(promises);
      const firstRejection = result.find(i => i.status === 'rejected');
      if (firstRejection) {
        throw firstRejection.reason;
      }
    }
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(response) {
    let responseToCache = response;
    let pluginsUsed = false;
    for (const callback of this.iterateCallbacks('cacheWillUpdate')) {
      responseToCache = (await callback({
        request: this.request,
        response: responseToCache,
        event: this.event
      })) || undefined;
      pluginsUsed = true;
      if (!responseToCache) {
        break;
      }
    }
    if (!pluginsUsed) {
      if (responseToCache && responseToCache.status !== 200) {
        responseToCache = undefined;
      }
      {
        if (responseToCache) {
          if (responseToCache.status !== 200) {
            if (responseToCache.status === 0) {
              logger.warn(`The response for '${this.request.url}' ` + `is an opaque response. The caching strategy that you're ` + `using will not cache opaque responses by default.`);
            } else {
              logger.debug(`The response for '${this.request.url}' ` + `returned a status code of '${response.status}' and won't ` + `be cached as a result.`);
            }
          }
        }
      }
    }
    return responseToCache;
  }
}

/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * An abstract base class that all other strategy classes must extend from:
 *
 * @memberof workbox-strategies
 */
class Strategy {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(options = {}) {
    /**
     * Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     *
     * @type {string}
     */
    this.cacheName = cacheNames.getRuntimeName(options.cacheName);
    /**
     * The list
     * [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * used by this strategy.
     *
     * @type {Array<Object>}
     */
    this.plugins = options.plugins || [];
    /**
     * Values passed along to the
     * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
     * of all fetch() requests made by this strategy.
     *
     * @type {Object}
     */
    this.fetchOptions = options.fetchOptions;
    /**
     * The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     *
     * @type {Object}
     */
    this.matchOptions = options.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(options) {
    const [responseDone] = this.handleAll(options);
    return responseDone;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(options) {
    // Allow for flexible options to be passed.
    if (options instanceof FetchEvent) {
      options = {
        event: options,
        request: options.request
      };
    }
    const event = options.event;
    const request = typeof options.request === 'string' ? new Request(options.request) : options.request;
    const params = 'params' in options ? options.params : undefined;
    const handler = new StrategyHandler(this, {
      event,
      request,
      params
    });
    const responseDone = this._getResponse(handler, request, event);
    const handlerDone = this._awaitComplete(responseDone, handler, request, event);
    // Return an array of promises, suitable for use with Promise.all().
    return [responseDone, handlerDone];
  }
  async _getResponse(handler, request, event) {
    await handler.runCallbacks('handlerWillStart', {
      event,
      request
    });
    let response = undefined;
    try {
      response = await this._handle(request, handler);
      // The "official" Strategy subclasses all throw this error automatically,
      // but in case a third-party Strategy doesn't, ensure that we have a
      // consistent failure when there's no response or an error response.
      if (!response || response.type === 'error') {
        throw new WorkboxError('no-response', {
          url: request.url
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        for (const callback of handler.iterateCallbacks('handlerDidError')) {
          response = await callback({
            error,
            event,
            request
          });
          if (response) {
            break;
          }
        }
      }
      if (!response) {
        throw error;
      } else {
        logger.log(`While responding to '${getFriendlyURL(request.url)}', ` + `an ${error instanceof Error ? error.toString() : ''} error occurred. Using a fallback response provided by ` + `a handlerDidError plugin.`);
      }
    }
    for (const callback of handler.iterateCallbacks('handlerWillRespond')) {
      response = await callback({
        event,
        request,
        response
      });
    }
    return response;
  }
  async _awaitComplete(responseDone, handler, request, event) {
    let response;
    let error;
    try {
      response = await responseDone;
    } catch (error) {
      // Ignore errors, as response errors should be caught via the `response`
      // promise above. The `done` promise will only throw for errors in
      // promises passed to `handler.waitUntil()`.
    }
    try {
      await handler.runCallbacks('handlerDidRespond', {
        event,
        request,
        response
      });
      await handler.doneWaiting();
    } catch (waitUntilError) {
      if (waitUntilError instanceof Error) {
        error = waitUntilError;
      }
    }
    await handler.runCallbacks('handlerDidComplete', {
      event,
      request,
      response,
      error: error
    });
    handler.destroy();
    if (error) {
      throw error;
    }
  }
}
/**
 * Classes extending the `Strategy` based class should implement this method,
 * and leverage the {@link workbox-strategies.StrategyHandler}
 * arg to perform all fetching and cache logic, which will ensure all relevant
 * cache, cache options, fetch options and plugins are used (per the current
 * strategy instance).
 *
 * @name _handle
 * @instance
 * @abstract
 * @function
 * @param {Request} request
 * @param {workbox-strategies.StrategyHandler} handler
 * @return {Promise<Response>}
 *
 * @memberof workbox-strategies.Strategy
 */

/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * A {@link workbox-strategies.Strategy} implementation
 * specifically designed to work with
 * {@link workbox-precaching.PrecacheController}
 * to both cache and fetch precached assets.
 *
 * Note: an instance of this class is created automatically when creating a
 * `PrecacheController`; it's generally not necessary to create this yourself.
 *
 * @extends workbox-strategies.Strategy
 * @memberof workbox-precaching
 */
class PrecacheStrategy extends Strategy {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(options = {}) {
    options.cacheName = cacheNames.getPrecacheName(options.cacheName);
    super(options);
    this._fallbackToNetwork = options.fallbackToNetwork === false ? false : true;
    // Redirected responses cannot be used to satisfy a navigation request, so
    // any redirected response must be "copied" rather than cloned, so the new
    // response doesn't contain the `redirected` flag. See:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
    this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(request, handler) {
    const response = await handler.cacheMatch(request);
    if (response) {
      return response;
    }
    // If this is an `install` event for an entry that isn't already cached,
    // then populate the cache.
    if (handler.event && handler.event.type === 'install') {
      return await this._handleInstall(request, handler);
    }
    // Getting here means something went wrong. An entry that should have been
    // precached wasn't found in the cache.
    return await this._handleFetch(request, handler);
  }
  async _handleFetch(request, handler) {
    let response;
    const params = handler.params || {};
    // Fall back to the network if we're configured to do so.
    if (this._fallbackToNetwork) {
      {
        logger.warn(`The precached response for ` + `${getFriendlyURL(request.url)} in ${this.cacheName} was not ` + `found. Falling back to the network.`);
      }
      const integrityInManifest = params.integrity;
      const integrityInRequest = request.integrity;
      const noIntegrityConflict = !integrityInRequest || integrityInRequest === integrityInManifest;
      // Do not add integrity if the original request is no-cors
      // See https://github.com/GoogleChrome/workbox/issues/3096
      response = await handler.fetch(new Request(request, {
        integrity: request.mode !== 'no-cors' ? integrityInRequest || integrityInManifest : undefined
      }));
      // It's only "safe" to repair the cache if we're using SRI to guarantee
      // that the response matches the precache manifest's expectations,
      // and there's either a) no integrity property in the incoming request
      // or b) there is an integrity, and it matches the precache manifest.
      // See https://github.com/GoogleChrome/workbox/issues/2858
      // Also if the original request users no-cors we don't use integrity.
      // See https://github.com/GoogleChrome/workbox/issues/3096
      if (integrityInManifest && noIntegrityConflict && request.mode !== 'no-cors') {
        this._useDefaultCacheabilityPluginIfNeeded();
        const wasCached = await handler.cachePut(request, response.clone());
        {
          if (wasCached) {
            logger.log(`A response for ${getFriendlyURL(request.url)} ` + `was used to "repair" the precache.`);
          }
        }
      }
    } else {
      // This shouldn't normally happen, but there are edge cases:
      // https://github.com/GoogleChrome/workbox/issues/1441
      throw new WorkboxError('missing-precache-entry', {
        cacheName: this.cacheName,
        url: request.url
      });
    }
    {
      const cacheKey = params.cacheKey || (await handler.getCacheKey(request, 'read'));
      // Workbox is going to handle the route.
      // print the routing details to the console.
      logger.groupCollapsed(`Precaching is responding to: ` + getFriendlyURL(request.url));
      logger.log(`Serving the precached url: ${getFriendlyURL(cacheKey instanceof Request ? cacheKey.url : cacheKey)}`);
      logger.groupCollapsed(`View request details here.`);
      logger.log(request);
      logger.groupEnd();
      logger.groupCollapsed(`View response details here.`);
      logger.log(response);
      logger.groupEnd();
      logger.groupEnd();
    }
    return response;
  }
  async _handleInstall(request, handler) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const response = await handler.fetch(request);
    // Make sure we defer cachePut() until after we know the response
    // should be cached; see https://github.com/GoogleChrome/workbox/issues/2737
    const wasCached = await handler.cachePut(request, response.clone());
    if (!wasCached) {
      // Throwing here will lead to the `install` handler failing, which
      // we want to do if *any* of the responses aren't safe to cache.
      throw new WorkboxError('bad-precaching-response', {
        url: request.url,
        status: response.status
      });
    }
    return response;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let defaultPluginIndex = null;
    let cacheWillUpdatePluginCount = 0;
    for (const [index, plugin] of this.plugins.entries()) {
      // Ignore the copy redirected plugin when determining what to do.
      if (plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
        continue;
      }
      // Save the default plugin's index, in case it needs to be removed.
      if (plugin === PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
        defaultPluginIndex = index;
      }
      if (plugin.cacheWillUpdate) {
        cacheWillUpdatePluginCount++;
      }
    }
    if (cacheWillUpdatePluginCount === 0) {
      this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
    } else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
      // Only remove the default plugin; multiple custom plugins are allowed.
      this.plugins.splice(defaultPluginIndex, 1);
    }
    // Nothing needs to be done if cacheWillUpdatePluginCount is 1
  }
}
PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({
    response
  }) {
    if (!response || response.status >= 400) {
      return null;
    }
    return response;
  }
};
PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({
    response
  }) {
    return response.redirected ? await copyResponse(response) : response;
  }
};

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Performs efficient precaching of assets.
 *
 * @memberof workbox-precaching
 */
class PrecacheController {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({
    cacheName,
    plugins = [],
    fallbackToNetwork = true
  } = {}) {
    this._urlsToCacheKeys = new Map();
    this._urlsToCacheModes = new Map();
    this._cacheKeysToIntegrities = new Map();
    this._strategy = new PrecacheStrategy({
      cacheName: cacheNames.getPrecacheName(cacheName),
      plugins: [...plugins, new PrecacheCacheKeyPlugin({
        precacheController: this
      })],
      fallbackToNetwork
    });
    // Bind the install and activate methods to the instance.
    this.install = this.install.bind(this);
    this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(entries) {
    this.addToCacheList(entries);
    if (!this._installAndActiveListenersAdded) {
      self.addEventListener('install', this.install);
      self.addEventListener('activate', this.activate);
      this._installAndActiveListenersAdded = true;
    }
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(entries) {
    {
      finalAssertExports.isArray(entries, {
        moduleName: 'workbox-precaching',
        className: 'PrecacheController',
        funcName: 'addToCacheList',
        paramName: 'entries'
      });
    }
    const urlsToWarnAbout = [];
    for (const entry of entries) {
      // See https://github.com/GoogleChrome/workbox/issues/2259
      if (typeof entry === 'string') {
        urlsToWarnAbout.push(entry);
      } else if (entry && entry.revision === undefined) {
        urlsToWarnAbout.push(entry.url);
      }
      const {
        cacheKey,
        url
      } = createCacheKey(entry);
      const cacheMode = typeof entry !== 'string' && entry.revision ? 'reload' : 'default';
      if (this._urlsToCacheKeys.has(url) && this._urlsToCacheKeys.get(url) !== cacheKey) {
        throw new WorkboxError('add-to-cache-list-conflicting-entries', {
          firstEntry: this._urlsToCacheKeys.get(url),
          secondEntry: cacheKey
        });
      }
      if (typeof entry !== 'string' && entry.integrity) {
        if (this._cacheKeysToIntegrities.has(cacheKey) && this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
          throw new WorkboxError('add-to-cache-list-conflicting-integrities', {
            url
          });
        }
        this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
      }
      this._urlsToCacheKeys.set(url, cacheKey);
      this._urlsToCacheModes.set(url, cacheMode);
      if (urlsToWarnAbout.length > 0) {
        const warningMessage = `Workbox is precaching URLs without revision ` + `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` + `Learn more at https://bit.ly/wb-precache`;
        {
          logger.warn(warningMessage);
        }
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(event) {
    // waitUntil returns Promise<any>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return waitUntil(event, async () => {
      const installReportPlugin = new PrecacheInstallReportPlugin();
      this.strategy.plugins.push(installReportPlugin);
      // Cache entries one at a time.
      // See https://github.com/GoogleChrome/workbox/issues/2528
      for (const [url, cacheKey] of this._urlsToCacheKeys) {
        const integrity = this._cacheKeysToIntegrities.get(cacheKey);
        const cacheMode = this._urlsToCacheModes.get(url);
        const request = new Request(url, {
          integrity,
          cache: cacheMode,
          credentials: 'same-origin'
        });
        await Promise.all(this.strategy.handleAll({
          params: {
            cacheKey
          },
          request,
          event
        }));
      }
      const {
        updatedURLs,
        notUpdatedURLs
      } = installReportPlugin;
      {
        printInstallDetails(updatedURLs, notUpdatedURLs);
      }
      return {
        updatedURLs,
        notUpdatedURLs
      };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(event) {
    // waitUntil returns Promise<any>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return waitUntil(event, async () => {
      const cache = await self.caches.open(this.strategy.cacheName);
      const currentlyCachedRequests = await cache.keys();
      const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
      const deletedURLs = [];
      for (const request of currentlyCachedRequests) {
        if (!expectedCacheKeys.has(request.url)) {
          await cache.delete(request);
          deletedURLs.push(request.url);
        }
      }
      {
        printCleanupDetails(deletedURLs);
      }
      return {
        deletedURLs
      };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(url) {
    const urlObject = new URL(url, location.href);
    return this._urlsToCacheKeys.get(urlObject.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(cacheKey) {
    return this._cacheKeysToIntegrities.get(cacheKey);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(request) {
    const url = request instanceof Request ? request.url : request;
    const cacheKey = this.getCacheKeyForURL(url);
    if (cacheKey) {
      const cache = await self.caches.open(this.strategy.cacheName);
      return cache.match(cacheKey);
    }
    return undefined;
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(url) {
    const cacheKey = this.getCacheKeyForURL(url);
    if (!cacheKey) {
      throw new WorkboxError('non-precached-url', {
        url
      });
    }
    return options => {
      options.request = new Request(url);
      options.params = Object.assign({
        cacheKey
      }, options.params);
      return this.strategy.handle(options);
    };
  }
}

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
let precacheController;
/**
 * @return {PrecacheController}
 * @private
 */
const getOrCreatePrecacheController = () => {
  if (!precacheController) {
    precacheController = new PrecacheController();
  }
  return precacheController;
};

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Removes any URL search parameters that should be ignored.
 *
 * @param {URL} urlObject The original URL.
 * @param {Array<RegExp>} ignoreURLParametersMatching RegExps to test against
 * each search parameter name. Matches mean that the search parameter should be
 * ignored.
 * @return {URL} The URL with any ignored search parameters removed.
 *
 * @private
 * @memberof workbox-precaching
 */
function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
  // Convert the iterable into an array at the start of the loop to make sure
  // deletion doesn't mess up iteration.
  for (const paramName of [...urlObject.searchParams.keys()]) {
    if (ignoreURLParametersMatching.some(regExp => regExp.test(paramName))) {
      urlObject.searchParams.delete(paramName);
    }
  }
  return urlObject;
}

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Generator function that yields possible variations on the original URL to
 * check, one at a time.
 *
 * @param {string} url
 * @param {Object} options
 *
 * @private
 * @memberof workbox-precaching
 */
function* generateURLVariations(url, {
  ignoreURLParametersMatching = [/^utm_/, /^fbclid$/],
  directoryIndex = 'index.html',
  cleanURLs = true,
  urlManipulation
} = {}) {
  const urlObject = new URL(url, location.href);
  urlObject.hash = '';
  yield urlObject.href;
  const urlWithoutIgnoredParams = removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching);
  yield urlWithoutIgnoredParams.href;
  if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
    const directoryURL = new URL(urlWithoutIgnoredParams.href);
    directoryURL.pathname += directoryIndex;
    yield directoryURL.href;
  }
  if (cleanURLs) {
    const cleanURL = new URL(urlWithoutIgnoredParams.href);
    cleanURL.pathname += '.html';
    yield cleanURL.href;
  }
  if (urlManipulation) {
    const additionalURLs = urlManipulation({
      url: urlObject
    });
    for (const urlToAttempt of additionalURLs) {
      yield urlToAttempt.href;
    }
  }
}

/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * A subclass of {@link workbox-routing.Route} that takes a
 * {@link workbox-precaching.PrecacheController}
 * instance and uses it to match incoming requests and handle fetching
 * responses from the precache.
 *
 * @memberof workbox-precaching
 * @extends workbox-routing.Route
 */
class PrecacheRoute extends Route {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(precacheController, options) {
    const match = ({
      request
    }) => {
      const urlsToCacheKeys = precacheController.getURLsToCacheKeys();
      for (const possibleURL of generateURLVariations(request.url, options)) {
        const cacheKey = urlsToCacheKeys.get(possibleURL);
        if (cacheKey) {
          const integrity = precacheController.getIntegrityForCacheKey(cacheKey);
          return {
            cacheKey,
            integrity
          };
        }
      }
      {
        logger.debug(`Precaching did not find a match for ` + getFriendlyURL(request.url));
      }
      return;
    };
    super(match, precacheController.strategy);
  }
}

/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Add a `fetch` listener to the service worker that will
 * respond to
 * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
 * with precached assets.
 *
 * Requests for assets that aren't precached, the `FetchEvent` will not be
 * responded to, allowing the event to fall through to other `fetch` event
 * listeners.
 *
 * @param {Object} [options] See the {@link workbox-precaching.PrecacheRoute}
 * options.
 *
 * @memberof workbox-precaching
 */
function addRoute(options) {
  const precacheController = getOrCreatePrecacheController();
  const precacheRoute = new PrecacheRoute(precacheController, options);
  registerRoute(precacheRoute);
}

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * Adds items to the precache list, removing any duplicates and
 * stores the files in the
 * {@link workbox-core.cacheNames|"precache cache"} when the service
 * worker installs.
 *
 * This method can be called multiple times.
 *
 * Please note: This method **will not** serve any of the cached files for you.
 * It only precaches files. To respond to a network request you call
 * {@link workbox-precaching.addRoute}.
 *
 * If you have a single array of files to precache, you can just call
 * {@link workbox-precaching.precacheAndRoute}.
 *
 * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
 *
 * @memberof workbox-precaching
 */
function precache(entries) {
  const precacheController = getOrCreatePrecacheController();
  precacheController.precache(entries);
}

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
/**
 * This method will add entries to the precache list and add a route to
 * respond to fetch events.
 *
 * This is a convenience method that will call
 * {@link workbox-precaching.precache} and
 * {@link workbox-precaching.addRoute} in a single call.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 * @param {Object} [options] See the
 * {@link workbox-precaching.PrecacheRoute} options.
 *
 * @memberof workbox-precaching
 */
function precacheAndRoute(entries, options) {
  precache(entries);
  addRoute(options);
}

self.skipWaiting();
clientsClaim();

/**
 * The precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
precacheAndRoute([{
  "url": "/",
  "revision": "1778367498"
}, {
  "url": "/api/jsi18n/",
  "revision": "1778367498"
}, {
  "url": "/manifest.json",
  "revision": "1778367498"
}, {
  "url": "/static/README.txt?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/access_rights_dialog.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/add_remove_dialog.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/admin.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/alerts.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/bibliography.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/buttons.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/carets.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/chat.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/citation_dialog.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/colors.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/common.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/content_menu.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/contributors.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/cropper.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/data_table.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/dialog.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/dialog_table.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/dialog_usermedia.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/document.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/document_overview.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/document_template_admin.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/document_template_designer.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/dot_menu.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/e2ee.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/editor.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/errorlist.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/faq_dialog.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/feedback/feedback.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/figure.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/file_selector.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/flatpage.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/all.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/all.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/brands.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/brands.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/fontawesome.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/fontawesome.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/regular.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/regular.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/solid.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/solid.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/svg-with-js.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/svg-with-js.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/v4-font-face.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/v4-font-face.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/v4-shims.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/v4-shims.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/v5-font-face.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/css/v5-font-face.min.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/webfonts/fa-brands-400.ttf?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/webfonts/fa-brands-400.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/webfonts/fa-regular-400.ttf?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/webfonts/fa-regular-400.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/webfonts/fa-solid-900.ttf?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/webfonts/fa-solid-900.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/webfonts/fa-v4compatibility.ttf?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fontawesome/webfonts/fa-v4compatibility.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fonts.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/fonts/KaTeX_AMS-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Caligraphic-Bold.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Caligraphic-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Fraktur-Bold.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Fraktur-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Main-Bold.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Main-BoldItalic.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Main-Italic.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Main-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Math-BoldItalic.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Math-Italic.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_SansSerif-Bold.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_SansSerif-Italic.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_SansSerif-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Script-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Size1-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Size2-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Size3-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Size4-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/fonts/KaTeX_Typewriter-Regular.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/css/footnotes.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/forms.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/header_menu.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/inline_tools.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/mathlive.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_AMS-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Caligraphic-Bold.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Caligraphic-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Fraktur-Bold.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Fraktur-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Main-Bold.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Main-BoldItalic.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Main-Italic.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Main-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Math-BoldItalic.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Math-Italic.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_SansSerif-Bold.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_SansSerif-Italic.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_SansSerif-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Script-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Size1-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Size2-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Size3-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Size4-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/libs/mathlive/media/KaTeX_Typewriter-Regular.woff2?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/loader.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/margin_boxes.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/mathlive.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/merge.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/overview_menu.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/prelogin.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/prosemirror-example-setup.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/prosemirror-menu.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/prosemirror.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/pulldown.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/reset.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/review.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/show_profile.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/table.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/tags.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/text.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/tracking.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/two_factor.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/ui_dialogs.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/ui_tabs.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/css/user_template_manager.css?v=1778367498",
  "revision": null
}, {
  "url": "/static/fonts/document/Cardo-Bold.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/Cardo-Italic.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/Cardo-Regular.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/CrimsonText-Bold.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/CrimsonText-BoldItalic.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/CrimsonText-Italic.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/CrimsonText-Roman.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/Lobster-1.4.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/NoticiaText-Bold.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/NoticiaText-BoldItalic.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/NoticiaText-Italic.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/NoticiaText-Regular.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/OpenSans-Bold.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/OpenSans-Regular.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/document/SourceSansPro-Bold.woff",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-300.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-400.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-700.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-900.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-ext-300.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-ext-400.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-ext-700.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-ext-900.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-ext-italic-400.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/lato/lato-italic-400.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/roboto/roboto-300.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/fonts/roboto/roboto-700.woff2",
  "revision": "1778367498"
}, {
  "url": "/static/img/accept_change.avif?v=1778367498",
  "revision": null
}, {
  "url": "/static/img/default_avatar.avif?v=1778367498",
  "revision": null
}, {
  "url": "/static/img/error.avif?v=1778367498",
  "revision": null
}, {
  "url": "/static/img/favicon.avif?v=1778367498",
  "revision": null
}, {
  "url": "/static/img/fidus_face.avif?v=1778367498",
  "revision": null
}, {
  "url": "/static/img/free_star.avif?v=1778367498",
  "revision": null
}, {
  "url": "/static/img/icon_192.avif?v=1778367498",
  "revision": null
}, {
  "url": "/static/img/icon_512.avif?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/00ee21d09a723c07.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0139dd6425dee26d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/028e823b4f0f983f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0310de4693db2a82.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0321343e15099788.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0646cd57ae487355.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0724f72960c8cdc3.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/074fa7533088312e.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0776fc2a92126fd0.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/084499cd3ce89895.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/086ae6ab0396ca76.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/089cdc9f6508c02e.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/091a8760c38db2d6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0994ea2c224b4bb6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/09bbebfdc8233d7d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0a9ab226edfee086.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0bee7bf6bbfdea32.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0c7443ab16f7df66.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0eaeb7e4f6e6222d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/0f01c41ff6537ad4.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/10aa6bc98b638bc6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/10f617a69b6cc197.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/11475f2dc246fd87.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1181e90336bb4ab3.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/12de0830a733a937.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/13ee70062b308f19.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/16800a75a1f01be6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1734ec7f962c49f0.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1850bd41e706d550.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1a7e123bdad48442.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1cbfd6e2d833bbf4.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1cc3444cbb6a8c02.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1df00efeb757e2a6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1f045a34d0c9a371.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/1f8925826fc9078b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/2015d9c798e7c483.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/206ef6b885375565.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/221afa3fd02039d9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/23b205718723a77d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/24d46de1a5c1d8e2.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/25469eb048073162.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/25682a0cf9d96d76.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/257791ddbec90b65.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/25b88c96e06fb189.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/266bb4dda319f56d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/27aa1447fac3a18e.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/282eb4f86b8ed1fe.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/2a5f03544a648e71.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/2a9e223b1daf81f9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/2bacec2717cfa18e.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/2c6210ddc85da2f1.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/2d3c27e868e7e4d8.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/2e37ad25caef8be2.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/2f566e35e7200bc7.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/306e0783968a9cd9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/30b135d4188cb37d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3157bf87a3fb0f0a.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/34466dd647adb987.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/377968720cab208f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/38b316b81bd7a75c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3ac62d223c42b743.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3b2df90220de7078.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3b539919d7372557.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3c4e6c18f9bb472a.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3e12ae407197283c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3ed65ca542dd3169.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3edc162db8dc4c2c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3ee752cc7512e1af.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3f8800cd7f1c4004.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/3fd788239c9d018b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/401ebbab73a63d1f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/40434c24ecedb053.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/40f359093910334f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4116d070ed7f2376.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4376f4fc6d0d9947.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4514e8ce9fd9f077.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/46543d085a906d55.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/46f5e96543b6497f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4776632b48fd62f9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/47bfdbdff6f329c9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/48181b9a9ef5f4d4.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/49876beecf053f3f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4a16384056c6e106.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4b9ea6b053215b18.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4d721fab74e0a7d2.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4de155f1027c034c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4ded0d903269a281.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4ea7935507616a4b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/4f9fd4bf0ebcbd2a.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/5029f2f3d97b776a.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/50a1bc9432a73e07.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/53a735779614de84.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/53ad17d67d750708.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/553af7018b032137.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/5692b0ed14207008.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/56d02a99576fa2d3.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/596a6ba3582eea87.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/59b082d3f130761b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/5bcd4d6c5c511aab.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/5d3d0fdc73675bc6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/5e7a96984d7d4467.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/5f510319a1ebd9e9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/5fffb333f030bcd5.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/607d73b59f866105.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6129c5fd1093fc02.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/61e91470542c9d5c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/624e329076642730.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6308dbf447ee505d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/63503bb2377d9df6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/636c8f8d9a1fceca.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6520704627a6ba86.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6606d06edc848da3.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/66ab83326a62e631.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6a982c034ac7f5dd.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6ab1b78a2a17da12.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6c20d1963553d325.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6cfb168c5a9b766b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/6d23c74b21194056.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/703c63150d712ca0.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/706535bb73f4dbb8.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7065c5045b610805.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/71149e7689b541dc.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/71d91fd941105259.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/727a6828c2032c80.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/73a16c7562c8bb82.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/73c118f1d255550b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/73c82eab87180512.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/741f8a080bb86bf5.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/74f1e16d6600a0be.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/754350f526bf93de.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/75b08f1526c0d0bb.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/76a282cc5f42ca71.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7917b1e9138f4452.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7a258650fcbf7049.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7aea3f1a7b4c9554.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7bcfc9a289737a4a.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7c375292215b2752.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7c8e18aec4dd96f1.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7e4eed739ccfaf1b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/7f484f787c0cb6e7.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/80c61895c93864ed.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/81bf8699eb2068dd.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8270b4bd4be08dc2.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/845a5993423e138e.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/860186f194358fe3.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8650847fad805246.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/887091ad6697e070.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/89ed0aa47420d9ad.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8a587cab07e3f97d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8c4725ae06e46826.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8c5c45f3acce237e.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8c77d35817e7ab3d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8c9434705782707f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8d73a462d8e0559a.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/8eade4f999e6249b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/901d2fce2d104ac1.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/905f684f6cf97420.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/9200aba676db570c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/9267e2cf0a393e02.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/92907484fc7acb81.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/92f8ee5b87c2c3ab.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/9365ca5f87021503.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/938a6f9696933049.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/93f30a22e65f9a6f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/943d5caa96982a1f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/943e7e4bf050abd5.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/94fa6b3c37ce4de6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/956a5fbd95b8dcbb.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/95bd45e860b958fa.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/97010a0e243aadaa.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/980cf5b866554461.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/98d86ca6949f7087.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/98ee0c9e01233c5d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/98f64dc6623a3383.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/9b63657f172d430f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/9b7bfc8c0d22bf55.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/9ba61ca38c03eb38.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/a2eb864f4f05814c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/a43ede182eca5ece.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/a4819dc13af069c6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/a7439a5d50636656.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/aa587831b28d5836.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/aa73f6df83f4807d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/ac2b94f8a1e9620f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/accd9e5136f1c1d9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/aceac4332881fe0c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/adjust_doc_to_template_worker.js?v=1778367498",
  "revision": "a190fb2ee820fcbc8fa459a2fa486257"
}, {
  "url": "/static/js/ae4c9bb7b9f4bc4b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/app.js?v=1778367498",
  "revision": "36eb7dbec4e38e72e5bca15b87bdf786"
}, {
  "url": "/static/js/b046864eb336b1fb.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/b0b20dc3cc1f88a5.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/b1ce981451829bbd.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/b34a20e17a5dbcd9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/b563e7f62a2f095c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/b70dbcdf85d6484a.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/b8396d9bc9467206.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/b92cd807af6e75ab.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/b985f34d090bff36.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/bb680b08c9c7cb0a.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/bb6d58acfe17569c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/bc3da0a103d61bc3.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/bc796237ac5918eb.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/bcdfdae38e145a6d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/be721300c669d679.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/bf2b3928fa151537.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/bibliography_import_worker.js?v=1778367498",
  "revision": "68506a620c61dc04ff646f9fc5ac7d11"
}, {
  "url": "/static/js/browser_check.js?v=1778367498",
  "revision": "9d20f5688433105b288a5db7842f31e5"
}, {
  "url": "/static/js/c1b623e01d8897f0.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/c26719eac477e5e9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/c3babb3b4cf3878b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/c4c2ecd3ca2c795b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/c54e8a2ad1c18a57.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/c632b32badafb297.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/c6cef63a9430584f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/c948858a5c6bee01.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/ca14d76d409bc17c.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/ca2201b9998f20e5.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/cb88950516322e3f.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/d0bd53c271a7fb54.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/d49e024bad307d00.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/d4b48819924a53b2.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/d56718e50fa760de.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/d582ad16e3d7c0b2.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/d6860a274fe2a5cc.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/d742ad7eeaa44110.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/d8b1e1b659592327.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/dad7f8447665b1fc.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/dd1f2cc54c8a4ac1.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/document_template_list_admin.js?v=1778367498",
  "revision": "806d96a35aa75ec48a30b8be641f8da3"
}, {
  "url": "/static/js/e022191f85d69779.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e02f8d128bd42dad.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e3288570fdb9ebfa.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e336078c184cde6d.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e35c9bd908088b81.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e388aa7eb2744945.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e4450f686b864e63.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e5ec07d0040e3134.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e637d5f61e4c82d8.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e653918df0cb9798.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e6edd34f7290d382.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/e7fc09e85fd6c5e5.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/eaefe3697d1594ef.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/eb3afdcb2e416446.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/ebd38c3cd75ff3bd.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/editor-1778367498.js",
  "revision": "e8e1f1ef1b1b06c13165828796f4e66d"
}, {
  "url": "/static/js/ee05d859946400fb.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/error_hook.js?v=1778367498",
  "revision": "d411e81f39c83ff044c220683b14e8ff"
}, {
  "url": "/static/js/f2636eb5b82049dc.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f2c27823d378836b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f434694a34b4572b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f471781411bed953.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f49bf10f75497f5b.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f62cdc5490ff49e6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f6ac148e444e10bb.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f6d4676ff08fde89.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f725ec0616821390.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f7ef5208803f6e49.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/f9186d0181d82169.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/fa32f16382fac365.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/fb376ae606141dd9.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/fb3e5c3cbbe0ef18.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/fb6174f873d3b5c6.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/ffe26ffe18d443ef.csljson?v=1778367498",
  "revision": null
}, {
  "url": "/static/js/js_modules_bibliography_form_index_js-1778367498.js",
  "revision": "360af5fb8b127cfbeb717cefaba66f99"
}, {
  "url": "/static/js/js_modules_bibliography_form_strings_js-1778367498.js",
  "revision": "7fc89691a482b0ec734148c5b6722096"
}, {
  "url": "/static/js/js_modules_bibliography_import_index_js-1778367498.js",
  "revision": "7bc973e0b94505ecc7354d5501e4aeda"
}, {
  "url": "/static/js/js_modules_bibliography_overview_index_js-1778367498.js",
  "revision": "3f2f3c7729c97ac7f84abcdb3f87bb78"
}, {
  "url": "/static/js/js_modules_bibliography_schema_csl_bib_js-js_modules_exporter_tools_doc_content_js-js_modules-d5afa0-1778367498.js",
  "revision": "6ffccf05d71f4c7052104ea0f134e123"
}, {
  "url": "/static/js/js_modules_documents_overview_index_js-1778367498.js",
  "revision": "f8877cb9c37ec4ea233a1ee4b8a76509"
}, {
  "url": "/static/js/js_modules_editor_e2ee_encryptor_js-1778367498.js",
  "revision": "a8e5186c71b40d8255557d51260d082b"
}, {
  "url": "/static/js/js_modules_editor_e2ee_encryptor_js-js_modules_images_edit_dialog_model_js-1778367498.js",
  "revision": "f50b184c5d53627f464fca6ac1edf4a9"
}, {
  "url": "/static/js/js_modules_editor_e2ee_passphrase-dialog_js-1778367498.js",
  "revision": "826313ba306dfc17430849dc86405384"
}, {
  "url": "/static/js/js_modules_editor_e2ee_passphrase-manager_js-1778367498.js",
  "revision": "ba2184d4f26dc9f3c5d89213bc35dd30"
}, {
  "url": "/static/js/js_modules_exporter_docx_index_js-1778367498.js",
  "revision": "e032cfea56557df9d9f0df88ddff3b24"
}, {
  "url": "/static/js/js_modules_exporter_epub_index_js-1778367498.js",
  "revision": "4b45e47626aeb51a11fab8a905008515"
}, {
  "url": "/static/js/js_modules_exporter_html_index_js-1778367498.js",
  "revision": "d1ec6b0b3741b32e7f76d2c609a6e953"
}, {
  "url": "/static/js/js_modules_exporter_jats_index_js-1778367498.js",
  "revision": "b68901549799aafa61c9bffaab76fd70"
}, {
  "url": "/static/js/js_modules_exporter_latex_index_js-1778367498.js",
  "revision": "ae6bdf3cf682ea7a773a94e63aaa9b18"
}, {
  "url": "/static/js/js_modules_exporter_odt_index_js-1778367498.js",
  "revision": "5893e630346a1e5867e13770283a8959"
}, {
  "url": "/static/js/js_modules_exporter_pandoc_index_js-1778367498.js",
  "revision": "c105735e443d2a13811ef31c8287390f"
}, {
  "url": "/static/js/js_modules_exporter_print_index_js-1778367498.js",
  "revision": "c56165e6dd6a08ab06eaf9af3bd68a02"
}, {
  "url": "/static/js/js_modules_exporter_tools_xml_js-1778367498.js",
  "revision": "9233367cde99f4ce510ea567579a380f"
}, {
  "url": "/static/js/js_modules_images_edit_dialog_index_js-_2e940-1778367498.js",
  "revision": "89f8de8ab5d83aceb2183969a6844c36"
}, {
  "url": "/static/js/js_modules_images_edit_dialog_index_js-_2e941-1778367498.js",
  "revision": "9c05d62a37bc4c5d384114993f27b44b"
}, {
  "url": "/static/js/js_modules_user_template_manager_editor_js-1778367498.js",
  "revision": "2b542936765ea330f3218874ceba48dc"
}, {
  "url": "/static/js/js_modules_user_template_manager_overview_js-1778367498.js",
  "revision": "9002ac10492e3345416a9e0be4a23cce"
}, {
  "url": "/static/js/node_modules_pnpm_citeproc-plus_0_3_6_node_modules_citeproc-plus_dist_locales-8466b763_js-1778367498.js",
  "revision": "8d58d105e0b4d0b2abe17262f04427a8"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_biblatex-csl-converter_3_6_0_node_modules_biblatex-csl-converter_li-d3812c-1778367498.js",
  "revision": "cd4cbbfef8bb48da892d65c68c3589a3"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_citeproc-plus_0_3_6_node_modules_citeproc-plus_dist_citeproc_common-e48852-1778367498.js",
  "revision": "909ba67581f4a7e24b2b8b02be65fa50"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_citeproc-plus_0_3_6_node_modules_citeproc-plus_dist_styles-7dfdde96_js-1778367498.js",
  "revision": "0f9af4dc3d31ee9e375406d35cfcf882"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_cropperjs_1_6_2_node_modules_cropperjs_dist_cropper_js-1778367498.js",
  "revision": "467d40918f9dfd446cfd1af4cbbcfbaa"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_downloadjs_1_4_7_node_modules_downloadjs_download_js-node_modules_p-484d68-1778367498.js",
  "revision": "4392b5250b0d8a381da128e095f0cd89"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_fast-xml-parser_4_5_0_node_modules_fast-xml-parser_src_fxp_js-1778367498.js",
  "revision": "d8ae4846ae50feeeae8770e5ebc0c3d4"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_fastdom_1_0_11_node_modules_fastdom_fastdom_js-node_modules_pnpm_pr-cb5a3c-1778367498.js",
  "revision": "9516c2ef7816286dd36728715f3a7c54"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_jszip_3_10_1_node_modules_jszip_dist_jszip_min_js-1778367498.js",
  "revision": "c8748b0240e5d7025c7463bf57b75998"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_mathlive_0_104_0_node_modules_mathlive_dist_mathlive_mjs-1778367498.js",
  "revision": "a53f68db0614742706ee038dac73ca63"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_mathml-to-latex_1_4_3_node_modules_mathml-to-latex_dist_bundle_min_js-1778367498.js",
  "revision": "bbb4d778827768bb0d260411a442fcec"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_mathml2omml_0_5_0_node_modules_mathml2omml_dist_index_js-1778367498.js",
  "revision": "0e072c625256b6a6d2c7bed8ed7c15df"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_pretty_2_0_0_node_modules_pretty_index_js-1778367498.js",
  "revision": "480b3b8efdd28307f459be6e3849e7c4"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_prosemirror-commands_1_7_0_node_modules_prosemirror-commands_dist_i-9c513b-1778367498.js",
  "revision": "eb830005510454dabda08de06dbeccc0"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_tokenfield_1_5_2_node_modules_tokenfield_lib_tokenfield_js-1778367498.js",
  "revision": "a71c5c7c59b742a6fff6d0a4a49d26f1"
}, {
  "url": "/static/js/vendors-node_modules_pnpm_vivliostyle_print_2_39_1_node_modules_vivliostyle_print_dist_index_es6_js-1778367498.js",
  "revision": "a0b5e192ba2fef6eb536a2b5f75f9e71"
}, {
  "url": "/static/json/schema.json?v=1778367498",
  "revision": null
}, {
  "url": "/static/ogg/chat_notification.ogg?v=1778367498",
  "revision": null
}, {
  "url": "/static/svg/icon.svg?v=1778367498",
  "revision": null
}, {
  "url": "/static/zip/mathlive_style.zip?v=1778367498",
  "revision": null
}], {});
self.__WB_DISABLE_DEV_LOGS = true;
