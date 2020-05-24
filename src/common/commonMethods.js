export const getKey = () => {
    var data = "MTE1XzEwNF85N18xMDlfMTA5XzEwNV8xMDdfMTAzXzEwNV8xMDlfMTE1XzEwNV8xMDhfNTBfNDhfNDk="

    data = atob(data)

    var arr = data.split('_')

    var decryptData = ''

    for (var i = 0; i < arr.length; i++) {
        decryptData += String.fromCharCode(arr[i]);
    }

    return decryptData
}

export const isValidEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}