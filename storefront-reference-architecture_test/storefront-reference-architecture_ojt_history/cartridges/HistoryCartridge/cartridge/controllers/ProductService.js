'use strict'

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
const crypto = require('dw/util/UUIDUtils');

var getToken = LocalServiceRegistry.createService('getToken', {
    createRequest : function(svc, url, data) {
        svc.setRequestMethod('POST');
        svc.setURL("https://account.demandware.com/dwsso/oauth2/access_token");
        svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
        svc.addHeader('Authorization', "Basic MDZkY2I3NjctMGNhYy00OGM2LWI5MmUtNWRhYzI1ZDA1YTNlOmRwZmVoZmtlaDEx");
        svc.addParam("grant_type", "client_credentials");
        return svc;
    },
    parseResponse: function (svc, res) {
        var body = res.getText();
        return body;
    },
    getRequestLogMessage: function (msg) {
        var data = InicisUtils.nvpToObj(msg);
        Constants.requestLogMasking.forEach(function (key) {
            if (data[key]) {
                data[key] = '*****';
            }
        });
        return JSON.stringify(data, null, 4);
    },
    getResponseLogMessage: function (res) {
        var data = JSON.parse(res.getText());
        Constants.responseLogMasking.forEach(function (key) {
            if (data[key]) {
                data[key] = '*****';
            }
        });
        return JSON.stringify(data, null, 4);
    }
});

var addProductHistory  = LocalServiceRegistry.createService('addProductHistory', {
    createRequest : function(svc, url, data) {
        svc.setRequestMethod('PUT');
        svc.setURL("https://zyac-001.dx.commercecloud.salesforce.com/s/-/dw/data/v18_1/custom_objects/history/" + data.c_item_uuid);
        svc.addHeader("Authorization", "Bearer "+ data.c_access_token);
        svc.addHeader('Content-Type', 'application/json');

        if (svc.getRequestMethod() === 'PUT') {
            return JSON.stringify(data);
        }
        return JSON.stringify(data);
    },
    parseResponse: function (svc, res) {
        var body = res.getText();
        return body;
    },
    getRequestLogMessage: function (msg) {
        var data = InicisUtils.nvpToObj(msg);
        Constants.requestLogMasking.forEach(function (key) {
            if (data[key]) {
                data[key] = '*****';
            }
        });
        return JSON.stringify(data, null, 4);
    },
    getResponseLogMessage: function (res) {
        var data = JSON.parse(res.getText());
        Constants.responseLogMasking.forEach(function (key) {
            if (data[key]) {
                data[key] = '*****';
            }
        });
        return JSON.stringify(data, null, 4);
    }
});

module.exports = {
    getToken : getToken
    , addProductHistory : addProductHistory 
}