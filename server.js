import fs from "fs";
import express from "express";
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import * as webpackHelper from "./server/helpers/webpackHelper";
import WS from './server/helpers/WSS';
const WebSocketServer = WS;
const app = express();
const hbs = expressHandlebars.create({});

global.rootPath = __dirname;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "10mb"}));

if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
    webpackHelper.useWebpackMiddleware(app)
} else {
    console.log('PRODUCTION ENVIRONMENT');
    app.use('/client.bundle.js', express.static('client.bundle.js'));
    app.use('/style.bundle.css', express.static('style.bundle.css'));
}

app.use('/static', express.static('static'));

app.use(require('./server/helpers/reactHelper').reactMiddleware);

app.use('/', require("./server/routes/index").router);
app.use('/tracklist', require("./server/routes/tracklist").router);
app.use('/getfile', require("./server/routes/getfile").router);
app.use('/download', require('./server/routes/download').router);
app.use('/getdirectory', require('./server/routes/getDirectory').router);
let port = JSON.parse(fs.readFileSync("package.json")).port || 3000;
if(process.env.DOCKERIZED) port = 80;
app.listen(port);
console.log(`Listening on port ${port}`);
