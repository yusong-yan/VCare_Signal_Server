"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");
var signaling_1 = require("./signaling");
var log_1 = require("./log");
var httphandler_1 = require("./class/httphandler");
exports.createServer = function (config) {
    var app = express();
    httphandler_1.reset(config.mode);
    // logging http access
    if (config.logging != "none") {
        app.use(morgan(config.logging));
    }
    // const signal = require('./signaling');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.get('/config', function (req, res) { return res.json({ useWebSocket: config.websocket, startupMode: config.mode, logging: config.logging }); });
    app.use('/signaling', signaling_1.default);
    return app;
};
