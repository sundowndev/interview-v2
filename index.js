"use strict";

//import ApiClient from './src/ApiClient';
import JsonResponse from './src/JsonResponse';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//const api = new ApiClient();
const json = new JsonResponse();
const axios = require('axios');

/**
 * Config
 * @type {number}
 */
const port = 3000;
const ApiUrl = 'https://jsonplaceholder.typicode.com';

/**
 * Routes
 */
app.use(function (req, res, next) {
    json.init(app, res);

    next()
});

app.get('/', (req, res) => {
    return json.send(res, 200, {data: []});
});

app.get('/posts', async (req, res) => {
    const params = ['userId', 'userPos'];
    const posts = await axios(ApiUrl + '/posts');

    const formattedPosts = posts.data.map(async post => {
        const userId = post.userId;
        const user = await axios(ApiUrl + '/users/' + userId);

        const commentsCount = await axios(ApiUrl + '/posts/' + post.id + '/comments');

        return {
            id: post.id,
            title: '<h1>' + post.title + '</h1>',
            body: '<p>' + post.body + '</p>',
            comments_count: commentsCount.data.length,
            user: {
                id: user.data.id,
                firstname: user.data.name,
                lastname: user.data.name,
                email: user.data.email,
                geo: user.data.geo
            }
        };
    });

    const response = await Promise.all(formattedPosts);

    return json.send(res, 200, {data: response});
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
