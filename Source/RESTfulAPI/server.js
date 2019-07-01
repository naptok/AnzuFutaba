module.exports = (port) => {
    // load modules
    const http = require('http');
    const url = require('url');
    const exec = require('child_process').exec;

    // Execute function
    function executeFunction(json_temp, data) {
        return new Promise((resolve, reject) => {
            try {
                let body = JSON.parse(Buffer.concat(data).toString());
                (require(`./function/${body.func}.js`))(body, { reject, resolve, json_temp });
            } catch (e) {
                reject({ message: e.message, stack: e.stack });
            }
        });
    }

    // Main code
    http.createServer((req, res) => {
        var pathname = url.parse(req.url).pathname;

        if (pathname == "/") {
            var data = [];
            var res_json = {};
            req.on('data', chunk => data.push(chunk));
            req.on('end', () => {
                executeFunction(res_json, data).then(() => {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify(res_json));
                }, (error) => {
                    console.log(error);
                    res_json.success = false;
                    res_json.reason = error;
                    res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify(res_json));
                });
            });
        } else {
            // github pull
            let data = { success: true };
            exec(`git clone https://github.com${pathname}`, (err, stdout, stderr) => {
                if (err) {
                    data.success = false;
                    data.reason = stderr;
                } else {
                    
                }
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(data));
            });
        }
    }).listen(port);
}