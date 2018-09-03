"use strict";

import Position from './src/Position';

const express = require('express');

const app = express();
const axios = require('axios');
const position = new Position();

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

        const promises = posts.data.map(async (post) => {
            const UserId = post.userId;
            const User = await axios(ApiUrl + '/users/' + UserId);

            if (req.query.userPos && !position.CheckPos(User.data.address.geo, req.query.userPos)) {
                console.log({
                    param: req.query.userPos,
                    CheckPos: position.CheckPos(User.data.address.geo, 'eq'),
                    userPos: User.data.address.geo.lat
                });

                return null;
            }

            const commentsCount = await axios(ApiUrl + '/posts/' + post.id + '/comments');

            return {
                id: post.id,
                title: '<h1>' + post.title + '</h1>',
                body: '<p>' + post.body + '</p>',
                comments_count: commentsCount.data.length,
                user: {
                    id: User.data.id,
                    firstname: User.data.name,
                    lastname: User.data.name,
                    email: User.data.email,
                    geo: User.data.address.geo
                }
            };
        });

        const formattedPosts = await Promise.all(promises);

        const data = formattedPosts.filter((p) => {
            return (p !== null);
        });

        return res.json({data: data})
    } catch (err) {
        console.error(err);
        return res.json({error: {code: 500, message: err}})
    }
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
