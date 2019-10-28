const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  exec('docker ps -a --format " - **{{.Names}}** : {{.Image}} : *{{.ID}}* [{{.Ports}}] [{{.Mounts}}]\n*{{.Status}}*\n"', function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**All containers :**\n${stdout}${msg.author}`);
    next();
  });
};
