module.exports = (port) => {
    // load modules
    const http = require('http');
    const url = require('url');
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
        var data = [];
        var res_json = {};
        req.on('data', chunk => data.push(chunk));
        req.on('end', () => {
            if (pathname == "/") {
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
            }



            else if (pathname != "/favicon.ico") {
                // github pull
                let data = { success: true };
                let repo = pathname.split("/")[2].split(":")[0];
                let tagname = pathname.split(":")[1];
                console.log(pathname);
                
                fs.stat(`./Git/${repo}`, (err) => {
                    if (!err) {
                        exec(`git pull`, { cwd: `./Git/${repo}` }, (err, stdout, stderr) => {
                            if (err) {
                                data.success = false;
                                data.reason = err;
                                console.log(err);
                            } else {
                                exec(`docker build -t ${tagname} .`, { cwd: `./Git/${repo}` }, (err, stdout, stderr) => {
                                    res.writeHead(200, { "Content-Type": "application/json" });
                                    return res.end(JSON.stringify(data));
                                });
                            }
                        });
                    }


                    else if (err.code === 'ENOENT') {
                        // 존재하지 않는 레퍼지토리
                        exec(`git clone https://github.com${pathname.split(":")[0]}`, { cwd: `./Git` }, (err, stdout, stderr) => {
                            if (err) {
                                data.success = false;
                                data.reason = err;
                                console.log(err);
                            } else {
                                exec(`docker build -t ${tagname} .`, { cwd: `./Git/${pathname.split(":")[0]}` }, (err, stdout, stderr) => {
                                    res.writeHead(200, { "Content-Type": "application/json" });
                                    return res.end(JSON.stringify(data));
                                });
                            }
                        });
                    }
                });
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ success: true }));
            }
        });

    }).listen(port);
}