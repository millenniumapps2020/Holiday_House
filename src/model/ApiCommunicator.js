
import { NetworkErrorMessages } from '../common/Messages';
import { AppSettings } from '../common/AppSettings';

import { encrypt, decrypt } from '../common/Encryption'



export const POST = (sub_url, bodyData, successCB, errorCB) => {
    var base_url = AppSettings.serviceURL + sub_url
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    base_url = (proxyurl + base_url)
    var data = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData)
    }

    return fetch(base_url, data).then((response) => {
        return response.json();
    }).then((responseData) => {
        console.log(base_url, data)
        if (responseData.status_code == "200") {
            console.log('successCB ', responseData)
            successCB(responseData);
        } else {
            console.log('errorCB ', responseData.message)
            errorCB(responseData.message);
        }
    }).catch((e) => {
        errorCB(e);
    })
}
export const GET = (sub_url, bodyData) => {
    // var sub_url = services.sub_url_key;
    var base_url = AppSettings.serviceURL + sub_url;
    // console.log('DELETE_METHOD', base_url, JSON.stringify(bodyData))

    var data = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }
    console.log('GET_METHOD', base_url, JSON.stringify(data))
    return fetch(base_url, data).then(res => res.json());
}