
import { NetworkErrorMessages } from '../common/Messages';
import { AppSettings } from '../common/AppSettings';

import { encrypt, decrypt } from '../common/Encryption'

import { INFO_IDS } from '../common/Constants'

import { getAppID, handleInvalidSession, handleInvalidMsg } from '../common/Bridge'


// Basic method to post and receive json response.
// returns a POST promise 
// async/await is not used, as it is not supported in all browsers (including IE all versions)
export const httpPost = function (url, data) {

    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? data : JSON.stringify({})
    })
        .then(checkStatus)
        .then(getBody)
        .then(parseBody)
        .then(parseJson)
        .catch(function (error) {

            // infoID available means the above promises are resolved correctly.
            if (!error.infoID)
                var error = new Error(NetworkErrorMessages.NO_CONNECTIVITY + " (" + error.message + ")");
            throw error
        })
}


// checks for Http Status 
function checkStatus(response) {
    if (response.status === 200) {
        return response
    } else {
        var error = new Error(NetworkErrorMessages.API_SERVICE_UNAVAILABLE);
        error.infoID = "-1";
        throw error
    }
}

function getBody(response) {
    return response.text();
}

function parseBody(response) {

    if (AppSettings.apiEncryptionEnabled) {

        var decrypted = decrypt(response)

        console.log("API Response> " + decrypted)
        return JSON.parse(decrypted);

    } else {
        console.log("API Response> " + response)
        return JSON.parse(response);
    }
}


function parseJson(response) {

    response = response.response;

    if (response.infoID !== INFO_IDS.SUCCESS) {

        var msg = response.infoMsg;
        var error = new Error(msg);
        error.infoID = response.infoID;
        error.data = response.data;
        throw error;
    }

    return response;
}


// ==========================================================================
// Common request for all features

export const placeRawRequest = function (url, reqobj, successCallback, errorCallback, echo) {

    return httpPost(AppSettings.serviceURL + url, reqobj)
        .then(function (respobj) {
            if (echo)
                respobj.echo = echo;

            if (successCallback)
                successCallback(respobj);

        })
}

export const placeRequest = function (url, request, successCallback, errorCallback, handleError = true) {

    let echo = null;

    if (request.data && request.data.searchString)
        echo = request.data.searchString;

    if (!request.hasAppID()) {
        request.setAppID(getAppID())
    }

    let req = request.toS();

    console.log("API Request> " + url + " > " + req)

    if (AppSettings.apiEncryptionEnabled) {
        req = encrypt(req)
    }

    return placeRawRequest(url, req, successCallback, errorCallback, echo)
        .catch(function (error) {

            console.error("API Communicator", error)

            if (handleError
                && error.infoID
                && (error.infoID == INFO_IDS.INVALID_SESSION
                    || error.infoID == INFO_IDS.INVALID_APP_ID)) {

                handleInvalidMsg(error);
                return;
            }

            if (echo)
                error.echo = echo;

            if (errorCallback)
                errorCallback(error);
        });
}

// ==========================================================================