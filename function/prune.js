const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  exec('docker image prune -f', function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**Image prune :**\n${stdout}${msg.author}`);
    next();
  });
};
