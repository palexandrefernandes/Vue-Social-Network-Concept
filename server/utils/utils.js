const _ = require('lodash');

class MissingParamError extends Error{
    constructor(message) {
        super(message);
        this.name = 'MissingParamError';
    }

}

function verifyParameters(item, params, callback) {
    let obj = {};
    if(!_.isArray(params)){
        params = [params];
    }
    if(!_.isObject(item)){
        callback(new Error('Items is not an object'));
    }
    for(let param of params){
        if(_.isUndefined(item[param])){
            callback(new MissingParamError(`${_.capitalize(param)} is missing!`));
        } else{
            _.assign(obj, {[param]: item[param]});
        }
    }
    
    return obj;
}

function formatResponse(error, message, data){
    let resp = {};
    if(error){
        _.assign(resp, {error: message});
    }
    else {
        _.assign(resp, {success: message});
    }
    if(data){
        _.assign(resp, {data: data});
    }
    return resp;
}

module.exports = {
    verifyParameters,
    formatResponse
};