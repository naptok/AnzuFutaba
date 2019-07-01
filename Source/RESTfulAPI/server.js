module.exports = (port) => {
    // load modules
    const http = require('http');
    const url = require('url');
    const path = require('path');
    const exec = require('child_process').exec;
    const fs = require('fs');

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
        } else if(pathname != "/favicon.ico") {
            // github pull
            let data = { success: true };
            let repo = pathname.split("/")[2];

            fs.stat(`./Git/${repo}`, (err)=>{
                if(!err){
                    exec(`git pull`, {cwd:`./Git/${repo}`}, (err, stdout, stderr) => {
                        if (err) {
                            data.success = false;
                            data.reason = err;
                            console.log(err);
                        }
                        res.writeHead(200, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify(data));
                    });
                }
                
                
                else if (err.code === 'ENOENT'){
                    // 존재하지 않는 레퍼지토리
                    exec(`git clone https://github.com${pathname}`, {cwd:`./Git`}, (err, stdout, stderr) => {
                        if (err) {
                            data.success = false;
                            data.reason = err;
                            console.log(err);
                        }
                        res.writeHead(200, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify(data));
                    });
                }
            });
        }
    }).listen(port);
}