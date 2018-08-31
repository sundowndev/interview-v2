"use strict";

export default function JsonResponse() {
    this.httpCode = 200;
    this.headers = {'Content-Type': 'application/json'};
}

JsonResponse.prototype.init = function (app, res) {
    // Enable json prettify
    app.set('json spaces', 2);

    // Set response headers
    res.setHeader('Accept', 'application/json');
    res.setHeader('Content-Type', 'application/json');
};

JsonResponse.prototype.send = function (res, code, response) {
    return res.json(response);
};
