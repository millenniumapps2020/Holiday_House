import { AppSettings } from './AppSettings'

import { encrypt, decrypt } from './Encryption'

export const storeItemByKey = function (key, value) {

    if (AppSettings.localStorageEncryptionEnabled) {
        window.localStorage.setItem(key, encrypt(value));
    }
    else {
        window.localStorage.setItem(key, value);
    }
}

export const getItemByKey = function (key) {
    if (AppSettings.localStorageEncryptionEnabled) {
        var val = window.localStorage.getItem(key);
        if (!val) return val;
        return decrypt(val);
    }
    else {
        return window.localStorage.getItem(key);
    }
}

export const storeToSessionStorage = function (key, value) {

    if (AppSettings.localStorageEncryptionEnabled) {
        window.sessionStorage.setItem(key, encrypt(value));
    }
    else {
        window.sessionStorage.setItem(key, value);
    }
}

export const getItemFromSessionStorage = function (key) {
    if (AppSettings.localStorageEncryptionEnabled) {
        var val = window.sessionStorage.getItem(key);
        if (!val) return val;
        return decrypt(val);
    }
    else {
        return window.sessionStorage.getItem(key);
    }
}
