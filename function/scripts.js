const fs = require('fs');
var str = '';
var dir = __dirname.split('/function')[0];

module.exports = function (msg, msgArray, client, embed, next) {
  fs.stat(`${dir}/user/${msg.author.id}`, (err) => {
    if (err) {
      fs.mkdir(`${dir}/user/${msg.author.id}`, (err2) => {
        str = err2 ? '**ERROR :**\nuser preset error' : '**Result :**\nSuccessed to create user preset';
        finish();
      });
    } else {
      fs.readdir(`${dir}/user/${msg.author.id}`, (err3, ev) => {
        if (err3) {
          str = '**ERROR :**\nuser preset load error';
          finish();
        } else {
          if (ev.length === 0) { str = '**Alert :**\n--script set [NAME]:\n[SCRIPTS]\n'; }
          for (var i = 0, len = ev.length; i < len; i++) { str += `[${i}] **${ev[i]}**\n`; }
          finish();
        }
      });
    }
  });

  function finish () {
    msg.channel.send(`${str} ${msg.author}`);
    next();
  }
};
