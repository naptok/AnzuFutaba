module.exports = (body, moduleControl) => {
    const async = require('async');
    const fs = require('fs');

    fs.readFile("./File/help.txt", "utf-8", (err, data) => {
        if (err)
            moduleControl.reject({ message: err.message, stack: err.stack });
        else {
            moduleControl.json_temp.string = data;

            // async series 성공
            moduleControl.json_temp.success = true;
            moduleControl.resolve();
        }
    });
};