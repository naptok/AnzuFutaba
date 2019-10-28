const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  const id = msgArray[1];
  msg.channel.send('**PLEASE WAIT...**');
  exec(`docker pull ${id}`, function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**Pull :**\n${stdout}\n${msg.author}`);
    next();
  });
};
