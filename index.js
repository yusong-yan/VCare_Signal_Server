"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderStreaming = void 0;
var commander_1 = require("commander");
var https = require("https");
var fs = require("fs");
var os = require("os");
const { initializeApp } = require('firebase/app');
const { ref, getDatabase, set} = require('firebase/database');
var server_1 = require("./server");
var websocket_1 = require("./websocket");
var RenderStreaming = /** @class */ (function () {

    RenderStreaming.writeUserData = function () {
        var interfaces = os.networkInterfaces();
        var addresses = [];
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4') {
                    if (address.address != '127.0.0.1') {
                        addresses.push(address.address);
                    }
                }
            }
        }
        const app = initializeApp({
                apiKey: "AIzaSyAkN1ZP5w5DyNZ7FrVbmpNBP9gF7m9zBCQ",
                authDomain: "well-health-capstone.firebaseapp.com",
                projectId: "well-health-capstone",
                storageBucket: "well-health-capstone.appspot.com",
                messagingSenderId: "806268228085",
                appId: "1:806268228085:web:01b265f54b5ea3a29850bc",
                measurementId: "G-SWY178BJNW",
        });
        const database = getDatabase();
        set(ref(database, 'messages/-999/Metadata/WebSocket'), "ws://"+addresses[0]);
    }

    function RenderStreaming(options) {
        var _this = this;
        this.options = options;
        this.app = server_1.createServer(this.options);
        this.server = this.app.listen(this.options.port);
        console.log("start websocket signaling server ws://" + this.getIPAddress()[0]);
        new websocket_1.default(this.server, this.options.mode);
        console.log("start as " + this.options.mode + " mode");
    }
    RenderStreaming.run = function (argv) {
        var program = new commander_1.Command();
        var readOptions = function () {
            if (Array.isArray(argv)) {
                program
                    .usage('[options] <apps...>')
                    .option('-p, --port <n>', 'Port to start the server on', process.env.PORT || "80")
                    .option('-m, --mode <type>', 'Choose Communication mode public or private (default public)', process.env.MODE || 'public')
                    .option('-l, --logging <type>', 'Choose http logging type combined, dev, short, tiny or none.(default dev)', process.env.LOGGING || 'dev')
                    .parse(argv);
                var option = program.opts();
                return {
                    port: option.port,
                    websocket: true,
                    mode: 'private',
                    logging: option.logging,
                };
            }
        };
        var options = readOptions();
        this.writeUserData();
        return new RenderStreaming(options);
    };
    RenderStreaming.prototype.getIPAddress = function () {
        var interfaces = os.networkInterfaces();
        var addresses = [];
        for (var k in interfaces) {
            for (var k2 in interfaces[k]) {
                var address = interfaces[k][k2];
                if (address.family === 'IPv4') {
                    if (address.address != '127.0.0.1') {
                        addresses.push(address.address);
                    }
                }
            }
        }
        return addresses;
    };
    return RenderStreaming;
}());
exports.RenderStreaming = RenderStreaming;
RenderStreaming.run(process.argv);
