const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  exec('docker rm -f $(docker ps -a -q)', function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**All containers removed :**\n${stdout}`);
    next();
  });
};
