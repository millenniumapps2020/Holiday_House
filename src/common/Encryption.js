import { AppSettings } from './AppSettings'
import { getKey } from './commonMethods'

var CryptoJS = require('crypto-js');

var wordArray = CryptoJS.enc.Utf8.parse(getKey());
var skey = CryptoJS.enc.Base64.stringify(wordArray);

var ekey = CryptoJS.enc.Base64.parse(skey);
var eiv = CryptoJS.enc.Base64.parse(skey);


export const encrypt = (value) => {
    var edata = CryptoJS.AES.encrypt(value, ekey, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: eiv });
    return edata.ciphertext.toString(CryptoJS.enc.Base64);
}

export const decrypt = (value) => {

    var bytes = CryptoJS.AES.decrypt(value, ekey, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: eiv });
    return bytes.toString(CryptoJS.enc.Utf8);
}