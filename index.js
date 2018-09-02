"use strict";

//import ApiClient from './src/ApiClient';
//import JsonResponse from './src/JsonResponse';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//const api = new ApiClient();
//const json = new JsonResponse();
const axios = require('axios');

/**
 * Config
 * @type {number}
 */
const port = 3000;

/**
 * External API URL
 * @type {string}
 */
const ApiUrl = 'https://jsonplaceholder.typicode.com';

/**
 * Check position
 * @param geo
 */
const checkPos = (geo) => {
    //TODO: check position properly
    switch (geo.lat | geo.lng) {
        case geo.lat === 0:
            return 'eq';
        case geo.lat === 23 | geo.lng >= 27:
            return 'cancer';
        case geo.lat === 23 | geo.lng <= 27:
            return 'cap';
        case geo.lat === 66 | geo.lng >= 33:
            return 'arctic';
        case geo.lat === 66 | geo.lng <= 33:
            return 'antarctic';
    }
};

/**
 * Routes
 */
app.use(function (req, res, next) {
    // Enable json prettify
    app.set('json spaces', 2);

    // Set response headers
    res.setHeader('Accept', 'application/json');
    res.setHeader('Content-Type', 'application/json');

    next()
});

app.get('/', (req, res) => {
    return res.json({data: []});
});

app.get('/posts', async (req, res) => {
    let PostQuery = (req.query.userId) ? ApiUrl + '/posts?userId=' + req.query.userId : ApiUrl + '/posts';

    try {
        const posts = await axios(PostQuery);

        const formattedPosts = posts.data.map(async (post) => {
            const userId = post.userId;
            const user = await axios(ApiUrl + '/users/' + userId);

            if (req.query.userPos && checkPos(user.data.address.geo) !== req.query.userPos) {
                //TODO: delete current element
                return {};
            }

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
                    geo: user.data.address.geo
                }
            };
        });

        const response = await Promise.all(formattedPosts);

        return res.json({data: response})
    } catch(err){
        return res.json({error: err})
    }
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
