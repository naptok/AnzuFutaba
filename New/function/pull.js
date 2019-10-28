const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  const id = msgArray[1];
  exec(`docker pull ${id}`, function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**Pull :**\n${stdout}`);
    console.log(err);
    next();
  });
};
