const exec = require('child_process').exec;

module.exports = function (msg, msgArray, client, embed, next) {
  var text;
  if (msg.content.indexOf('<=') === -1) { text = msgArray.join(' '); } else { text = msg.content; }
  const code = text.split('<=')[1] ? text.split('<=')[1] : '';

  exec(`docker ${code}`, function (err, stdout, stderr) {
    msg.channel.send(err ? `**ERROR :**\n${err.message}` : '**Result :**');
    if (!err) {
      for (var count = 0, len = stdout.length; count < len; count += 2000) {
        msg.channel.send(stdout.substr(count, 2000));
      }
    }
    next();
  });
};
