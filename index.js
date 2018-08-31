"use strict";

import ApiClient from './src/ApiClient';
import JsonResponse from './src/JsonResponse';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const api = new ApiClient();
const json = new JsonResponse();

/**
 * Config
 * @type {number}
 */
const port = 3000;

/**
 * Routes
 */
app.use(function (req, res, next) {
    // Default api domain
    api.setApiUrl('https://jsonplaceholder.typicode.com');

    json.init(app, res);

    next()
});

app.get('/', (req, res) => {
    return json.send(res, 200, {data: []});
});

app.get('/posts', (req, res) => {
    let posts = api.findAllPosts();

    posts.forEach(function (p) {
        let user = api.findUserById(p.userId);

        p.title = '<h1>' + p.title + '</h1>';
        p.body = '<p>' + p.body + '</p>';
        p.user = {
            "id": user.id,
            "firstname": user.name,
            "lastname": user.name,
            "email": user.email,
            "comments_count": 3,
            "pos": user.geo,
            "_links": {
                "posts": "/posts?user=" + user.id
            }
        };

        delete p.userId;
    });

    return json.send(res, 200, {data: posts});
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
