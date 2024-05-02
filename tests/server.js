require('dotenv').config();

const http = require('http');
const url = require('url');
const express = require('express');
const root = process.argv[2] || require('./wdio.conf').config.baseUrl;
const port = url.parse(root).port || process.env.PORT || '3000';
const app = express();

app.use(express.static(`${__dirname}/../demo/output`));

const server = http.createServer(app);
const exit = () => {
    console.log('Closing HTTP server...');
    server.close();
};

process.on('SIGTERM', exit);
process.on('SIGINT', exit);
server.listen(port, () => {
    console.log(`Serving docs from ${root}${url.parse(root).port ? '' : ':' + port }`);
});
