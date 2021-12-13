////////////////////////////////////////////////////////////////

const http = require('http');
const fs = require('fs');
/*const port = 6789;*/
////////////////////////////////////////////////////////////////

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        fs.readFile(__dirname+'/index.html', 'utf-8', (errors, contents) => {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === "/jessup") {
        fs.readFile(__dirname +'/jessup.html', 'utf8', (errors, contents) => {
            response.writeHead(200, { 'Content-type': 'text/html' });
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === '/william/new') {
        fs.readFile(__dirname +'/william.html', 'utf8', (errors, contents) => {
            response.writeHead(200, { 'Content-type': 'text/html' });
            response.write(contents);
            response.end();
        });
    }
    else if (request.url === '/welcome.jpg') {
        // notice we won't include the utf8 encoding
        fs.readFile(__dirname +'/welcome.jpg', function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'image/jpg' });
            response.write(contents);
            response.end();
        })
    }

    else if (request.url === '/style.css') {
        fs.readFile(__dirname +'/style.css', 'utf8', (errors, contents) => {
            response.writeHead(200, { 'Content-type': 'text/css' });
            response.write(contents);
            response.end();
        });
    }
    else {
        response.end('File not found!!!');
    }
});

//////////////////////////////////////////////////////////////////

server.listen(6789);
console.log("listening on port 6789 ");

//////////////////////////////////////////////////////////////////