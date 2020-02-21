
// ==========================================================================
// App Settings

// Environments
export const AppEnvironments = {
    DEV: "dev",
    PROD: "prod"
}

const getBool = function (v) {
    return v && v === "true";
}

// AppSettings
export const AppSettings = {
    appVersion: process.env.REACT_APP_APP_VERSION,
    appEnvironment: AppEnvironments.DEV,

    serviceURL: process.env.REACT_APP_SERVICE_URL,

    apiEncryptionEnabled: getBool(process.env.REACT_APP_API_ENCRYPTION_ENABLED),
    // encryptionKey: process.env.REACT_APP_ENCRYPTION_KEY,

    localStorageEncryptionEnabled: getBool(process.env.REACT_APP_LOCALSTORAGE_ENCRYPTION_ENABLED),

    // websocketRetryCount: 1000, // Should be a higher value.
    // websocketRetryInternal: 5000, // In Ms

    // minBrowserWidth : 1200,
    // minBrowserHeight: 600
}

if ('production' === process.env.NODE_ENV) {
    console.log = function () { }
    console.error = function () { }
    console.warn = function () { }
    document.addEventListener("contextmenu", event => event.preventDefault())
}

// ==========================================================================