const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === "/cars") {
        serveFile("/views/cars.html", res);
    } else if (req.url === "/dogs") {
        serveFile("/views/dogs.html", res);
    } else if (req.url === "/cars/new") {
        serveFile("/views/newcar.html", res);
    } else if (req.url.startsWith("/stylesheets/")) {
        serveFile(req.url, res, "text/css");
    } else if (req.url.startsWith("/images/")) {
        let ext = req.url.substr(-4);
        if (ext == '.jpg') { serveFile(req.url, res, "image/jpg"); }
        else if (ext == '.png') { serveFile(req.url, res, "image/png"); }
        else if (ext == 'webp') { serveFile(req.url, res, "image/webp"); }
        else { res.end('Image extension error - extension not supprted: ' + ext + ': ' + req.url)};
    } else {
        res.end('File not found!!!');
    }
}).listen(8000);

const serveFile = (pathToFile, res, type = "text/html") => {
    fs.readFile(`${__dirname}/${pathToFile}`, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write(`An internal server error occurred.`);
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": `${type}` });
            res.write(data);
            res.end();
        }
    });
};

console.log("listening on port 8000");