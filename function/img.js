const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  exec('docker images -a --format " - **{{.Repository}}** : {{.Tag}} : *{{.ID}}* [{{.VirtualSize}}] *{{.CreatedSince}}*"', function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**Image list :**\n${stdout}${msg.author}`);
    next();
  });
};
