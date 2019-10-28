const fs = require('fs');
var dir = __dirname.split('/function')[0];

module.exports = function (msg, msgArray, client, embed, next) {
  fs.readFile(`/${dir}/file/help.txt`, 'utf-8', function (err, data) {
    msg.channel.send(err ? `**ERROR :**\n${err}` : `${data}`);
    next();
  });
};
