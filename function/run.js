const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  var text;
  if (msg.content.indexOf('<=') === -1) { text = msgArray.join(' '); } else { text = msg.content; }
  const image = msgArray[1];
  const name = msgArray[2] && !msgArray[2].startsWith('<=') ? `--name ${msgArray[2]}` : '';
  const options = text.split('<=')[1] ? text.split('<=')[1] : '';
  console.log(options);

  exec(`docker run -it -d ${options} ${name} ${image}`, function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : `**Created :**\n${stdout}`);
    next();
  });
};
