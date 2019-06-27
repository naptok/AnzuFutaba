module.exports = (body, moduleControl) => {
    const async = require('async');
    const exec = require('child_process').exec;
    moduleControl.json_temp.string = "";

    var _name;
    if (body.name == undefined)
        _name = "";
    else
        _name = `--format "{{.Image}}:{{.ID}}"`

    exec(`docker ps -a ${_name}`, (err, stdout, stderr) => {
        if (err)
            moduleControl.reject({ message: err.message, stack: err.stack });
        else {
            moduleControl.json_temp.string = stdout
            moduleControl.json_temp.success = true;
            moduleControl.resolve();
        }
    });
};