const http = require('http');
const fs = require('fs');
const path = require('path');

function respondWithContentsOfFile(fileUrl) {
    const safePath = fileUrl.replace(/^\//, '');
    const filePath = path.join(__dirname, safePath);
    const fileData = fs.readFileSync(filePath, 'utf8');
    console.log(`File length ${fileData?.length ?? 0}`);
    return fileData;
}

const server = http.createServer((req, res) => {
    console.log(req.url);
    const resources = {
        html: [
            '/rotating-knob-component.html',
            '/slider-component.html',
            '/html/rotating-knob-template.html',
            '/html/slider-component-template.html',
            '/resr.html',
            '/cube.html',
        ],
        js: [
            '/js/base-types.js',
            '/js/resr.js',
            '/js/RotatingKnobElement.js',
            '/js/SliderComponentElement.js',
            '/js/utils.js',
        ]
    }
    try {
        if (resources.html.includes(req.url)) {
            const html = respondWithContentsOfFile(req.url);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        } else if (resources.js.includes(req.url)) {
            const js = respondWithContentsOfFile(req.url);
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(js);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(err.message);
    }
});

server.listen(3000, "127.0.0.1", (err) => {
    if (err) {
        throw err;
    }
    console.log('Listening on port 3000');
});
