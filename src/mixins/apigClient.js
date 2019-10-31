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
    var invokeUrl = 'https://nz503vqz32.execute-api.us-west-2.amazonaws.com/dev';
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
    
    
    
    apigClient.followsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsFollowersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/followers').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowersUsernameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsFollowersUsernameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/followers/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowersUsernameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowersUsernamePagenumGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['username', 'pagenum'], ['body']);
        
        var followsFollowersUsernamePagenumGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/followers/{username}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, ['username', 'pagenum'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowersUsernamePagenumGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowersUsernamePagenumOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsFollowersUsernamePagenumOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/followers/{username}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowersUsernamePagenumOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowingOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsFollowingOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/following').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowingOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowingUsernameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsFollowingUsernameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/following/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowingUsernameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowingUsernamePagenumGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['username', 'pagenum'], ['body']);
        
        var followsFollowingUsernamePagenumGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/following/{username}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, ['username', 'pagenum'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowingUsernamePagenumGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowingUsernamePagenumOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsFollowingUsernamePagenumOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/following/{username}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowingUsernamePagenumOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowerOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsFollowerOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/{follower}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowerOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowerFolloweeGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['follower', 'followee'], ['body']);
        
        var followsFollowerFolloweeGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/{follower}/{followee}').expand(apiGateway.core.utils.parseParametersToObject(params, ['follower', 'followee'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowerFolloweeGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowerFolloweePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['follower', 'followee'], ['body']);
        
        var followsFollowerFolloweePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/{follower}/{followee}').expand(apiGateway.core.utils.parseParametersToObject(params, ['follower', 'followee'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowerFolloweePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowerFolloweeDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['follower', 'followee'], ['body']);
        
        var followsFollowerFolloweeDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/{follower}/{followee}').expand(apiGateway.core.utils.parseParametersToObject(params, ['follower', 'followee'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowerFolloweeDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followsFollowerFolloweeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followsFollowerFolloweeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follows/{follower}/{followee}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followsFollowerFolloweeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var statusPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/status').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusFeedOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusFeedOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/feed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusFeedOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusFeedUsernameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusFeedUsernameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/feed/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusFeedUsernameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusFeedUsernamePagenumGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['username', 'pagenum'], ['body']);
        
        var statusFeedUsernamePagenumGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/status/feed/{username}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, ['username', 'pagenum'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusFeedUsernamePagenumGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusFeedUsernamePagenumOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusFeedUsernamePagenumOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/feed/{username}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusFeedUsernamePagenumOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusHashtagOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusHashtagOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/hashtag').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusHashtagOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusHashtagHashtagOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusHashtagHashtagOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/hashtag/{hashtag}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusHashtagHashtagOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusHashtagHashtagPagenumGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['pagenum', 'hashtag'], ['body']);
        
        var statusHashtagHashtagPagenumGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/status/hashtag/{hashtag}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, ['pagenum', 'hashtag'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusHashtagHashtagPagenumGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusHashtagHashtagPagenumOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusHashtagHashtagPagenumOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/hashtag/{hashtag}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusHashtagHashtagPagenumOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusUserOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusUserOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusUserOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusUserUsernameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusUserUsernameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/user/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusUserUsernameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusUserUsernamePagenumGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['username', 'pagenum'], ['body']);
        
        var statusUserUsernamePagenumGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/status/user/{username}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, ['username', 'pagenum'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusUserUsernamePagenumGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusUserUsernamePagenumOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusUserUsernamePagenumOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/user/{username}/{pagenum}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusUserUsernamePagenumOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var statusIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/status/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statusIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statusIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/status/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statusIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userAddPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var userAddPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/user/add').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userAddPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userAddOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userAddOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/add').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userAddOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userPhotoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userPhotoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/photo').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userPhotoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userPhotoUsernameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userPhotoUsernameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/photo/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userPhotoUsernameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userPhotoUsernamePhotoPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['username', 'photo'], ['body']);
        
        var userPhotoUsernamePhotoPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/user/photo/{username}/{photo}').expand(apiGateway.core.utils.parseParametersToObject(params, ['username', 'photo'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userPhotoUsernamePhotoPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userPhotoUsernamePhotoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userPhotoUsernamePhotoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/photo/{username}/{photo}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userPhotoUsernamePhotoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userUsernameGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['username'], ['body']);
        
        var userUsernameGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/user/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, ['username'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userUsernameGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userUsernameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userUsernameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/{username}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userUsernameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
