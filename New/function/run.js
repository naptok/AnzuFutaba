const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  const image = msgArray[1];
  const name = msgArray[2] && !msgArray[2].startsWith('<=') ? `--name ${msgArray[2]}` : '';
  const options = msg.content.split('<=')[1] ? msg.content.split('<=')[1] : '';

  exec(`docker run -it -d ${options} ${name} ${image}`, function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**Created :**\n${stdout}`);
    console.log(err);
    next();
  });
};
