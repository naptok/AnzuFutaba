const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  const code = msg.content.split('<=')[1] ? msg.content.split('<=')[1] : '';

  exec(`docker ${code}`, function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**Result :**\n${stdout}`);
    console.log(err);
    next();
  });
};
