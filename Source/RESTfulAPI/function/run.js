module.exports = (body, moduleControl) => {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const async = require('async');
    const exec = require('child_process').exec;
    moduleControl.json_temp.string = "";

    
    var port_string;
    if (body.port == undefined)
        port_string = "";
    else
        port_string = `-p ${(body.port).replace("-", ":")}`

    var name_string;
    if (body.name == undefined)
        name_string = "";
    else
        name_string = `--name ${body.name}${getRandomInt(10000, 99999)}`;

    var directory;
    if (body.directory == undefined)
    directory = "";
    else
    directory = `--privileged=true -v ${(body.directory).replace("-", ":")}`
    console.log(name_string + "/")
    exec(`docker run -it -d ${port_string} ${name_string} ${directory} ${body.image}`, (err, stdout, stderr) => {
        if (err)
            moduleControl.reject({ message: err.message, stack: err.stack });
        else {
            moduleControl.json_temp.string = stdout
            moduleControl.json_temp.success = true;
            moduleControl.resolve();
        }
    });
};