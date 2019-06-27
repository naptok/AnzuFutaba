module.exports = (port) => {
    // load modules
    const http = require('http');

    // Execute function
    function executeFunction (json_temp, data) {
        return new Promise((resolve, reject) => {
            try {
                let body = JSON.parse(Buffer.concat(data).toString());
                (require(`./function/${body.func}.js`))(body, {reject, resolve, json_temp});
            }catch(e) {
                reject({ message: e.message, stack : e.stack });
            }
        });
    }

    // Main code
    http.createServer((req, res)=>{
        var data = [];
        var res_json = {};
        req.on('data', chunk => data.push(chunk));
        req.on('end', ()=>{
            executeFunction(res_json, data).then(()=>{
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(res_json));
            }, (error)=>{
                console.log(error);
                res_json.success = false;
                res_json.reason = error;
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(res_json));
            });
        });
    }).listen(port);
}