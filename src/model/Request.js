
function Request() {
    this.data = {}
    this.appID = null;
}

Request.prototype.addToData = function (key, value) {
    this.data[key] = value;
}

Request.prototype.addToData = function (obj) {
    Object.keys(obj).forEach(key => {
        this.data[key] = obj[key]
    });
}

Request.prototype.setData = function (_data) {
    this.data = _data;
}

Request.prototype.setAppID = function (_appID) {
    this.appID = _appID;
}

Request.prototype.hasAppID = function () {
    return this.appID !== null;
}

Request.prototype.clearData = function () {
    this.data = {};
}

Request.prototype.getReq = function () {
    let request = {};

    request.data = this.data;
    request.appID = this.appID;

    let req = {};
    req.request = request;

    return req;
}

Request.prototype.toS = function () {
    return JSON.stringify(this.getReq());
}

export default Request;