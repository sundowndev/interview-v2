"use strict";

const request = require('request');
const async = require('async');

export default function ApiClient() {
    this.ApiUrl = '';
}

ApiClient.prototype.setApiUrl = function (url) {
    ApiClient.ApiUrl = url;
};

ApiClient.prototype.sendRequest = function (method, resource, data, callback) {
    async.parallel([
        function () {
            request.get({
                "headers": {"content-type": "application/json"},
                "url": ApiClient.ApiUrl + resource,
                "data": data
            }, (error, response, body) => {
                if(error) { console.log(err); callback(true); return; }
                let obj = JSON.parse(body);
                callback(false, obj);
            });
        }
    ]);
};

/**
 * Find all posts
 */
ApiClient.prototype.findAllPosts = function () {
    console.log(this.sendRequest('GET', '/posts', []));

    this.sendRequest('GET', '/posts', [], function (result) {
        return result;
    });
};

/**
 * Find posts by user id
 */
ApiClient.prototype.findPostsByUser = function (userId) {
    let posts = this.sendRequest('GET', '/posts', []);

    let postsOfUser = [];

    posts.forEach(function (p) {
        if (p.userId === userId) {
            postsOfUser.push(p);
        }
    });

    return postsOfUser;
};

/**
 * Find user by id
 */
ApiClient.prototype.findUserById = function (userId) {
    return this.sendRequest('GET', '/users/'+userId, []);
};

/**
 * Find comments by user id
 */
ApiClient.prototype.findCommentsByUserId = function () {
    return this.sendRequest('GET', '/comments', []);
};