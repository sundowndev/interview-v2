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
    let posts = await axios.get(ApiUrl + '/posts');

    const formatedPosts = posts.data.map(async post => {
        let userId = post.userId;
        let user = await axios.get(ApiUrl + '/users/'+userId);

        return {
            id: post.id,
            title: '<h1>'+post.title+'</h1>',
            body: '<p>'+post.body+'</p>',
            user: {
                id: user.data.id,
                firstname: user.data.name,
                lastname: user.data.name,
                email: user.data.email,
                comments_count: 3,
                pos: user.data.pos
            }
        };
    });

    const response = await Promise.all(formatedPosts);

    return json.send(res, 200, {data: response});
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
