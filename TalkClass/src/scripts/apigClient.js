/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

 console.log('aqui test2')
var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://15psp95at5.execute-api.us-east-1.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.talkclassAuthenticationPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassAuthenticationPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/authentication').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassAuthenticationPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassAuthenticationOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassAuthenticationOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/authentication').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassAuthenticationOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassClassroomsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassClassroomsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/classrooms').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassClassroomsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassClassroomsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassClassroomsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/classrooms').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassClassroomsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassClassroomsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassClassroomsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/classrooms').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassClassroomsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassClassroomsLevelGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassClassroomsLevelGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/classrooms/{level}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassClassroomsLevelGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassClassroomsLevelOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassClassroomsLevelOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/classrooms/{level}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassClassroomsLevelOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassEventsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassEventsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/events').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassEventsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassEventsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassEventsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/events').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassEventsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassEventsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassEventsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/events').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassEventsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassEventsDateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassEventsDateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/events/{date}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassEventsDateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassEventsDateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassEventsDateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/events/{date}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassEventsDateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassEventsDateTitleGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassEventsDateTitleGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/events/{date}/{title}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassEventsDateTitleGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassEventsDateTitlePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassEventsDateTitlePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/events/{date}/{title}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassEventsDateTitlePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassEventsDateTitleOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassEventsDateTitleOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/events/{date}/{title}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassEventsDateTitleOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassPicturesPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassPicturesPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/pictures').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassPicturesPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassPicturesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassPicturesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/pictures').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassPicturesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassProfilePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassProfilePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/profile').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassProfilePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassProfileOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassProfileOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/profile').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassProfileOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassUsersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassUsersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassUsersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassUsersPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassUsersPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassUsersPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassUsersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassUsersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassUsersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassUsersUsernameGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassUsersUsernameGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/users/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassUsersUsernameGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.talkclassUsersUsernameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var talkclassUsersUsernameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/talkclass/users/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(talkclassUsersUsernameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
