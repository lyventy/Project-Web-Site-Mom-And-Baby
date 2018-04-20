var result = {
    errorCode: 0,
    message:''
}

function message(mess){
    result.message = mess;
    result.data = null;
    return result;
}

function error(code, mess){
    result.errorCode = code;
    result.message = mess;
    result.data = null;
    return result;
}

function data(json){
    result.data = json;
    return result;
}

module.exports = {
    message : message,
    error : error,
    data : data
};
