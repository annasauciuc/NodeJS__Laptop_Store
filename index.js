const fs = require("fs");
const http = require("http");
const url = require('url');
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const lastopData = JSON.parse(json);
//console.log('json :', lastopData);
//console.log('__dirname :', __dirname);
const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathName;
    const query = url.parse(req.url, true).query.id;
    if (pathName === '/products' || pathName === '/') {
        console.log('req :', query);
        res.writeHead(200, { 'Content-type': 'text/html' });

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
            output = output.replace(/{%IMAGE%}/g, laptop.image);
            output = output.replace(/{%PRICE%}/g, laptop.price)
            output = output.replace(/{%SCREEN%}/g, laptop.screen)
            output = output.replace(/{%CPU%}/g, laptop.cpu)
            output = output.replace(/{%STORAGE%}/g, laptop.storage)
            output = output.replace(/{%RAM%}/g, laptop.ram)
            output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
            res.end(output)
        })
    } else if (pathName === '/laptop' && id < lastopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(` this is the laptop page for laptop${id}`);
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('no found');
    }


});
server.listen(1337, '127.0.0.1', () => {

})