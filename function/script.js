const fs = require('fs');
var str = '';
var dir = __dirname.split('/function')[0];

module.exports = function (msg, msgArray, client, embed, next) {
  try {
    fs.stat(`${dir}/user/${msg.author.id}`, function (err) {
      // 유저 데이터 자체가 없다
      if (err) { finish('**ERROR :**\nuser preset is not available\nuse \'scripts\' command'); return undefined; }

      fs.readdir(`${dir}/user/${msg.author.id}`, function (err3, ev) {
        // script 파일이 없다
        if (err3) { finish('**ERROR :**\nuser preset error'); return undefined; }

        switch (msgArray[1]) {
          case 'list':
            if (ev.length === 0) { finish('**ERROR :**\nuser preset is not available'); return undefined; }
            for (var i = 0; i < ev.length; i++) { str += `[${i}] **${ev[i]}**\n`; }
            finish(str);
            break;

          case 'set':
            fs.writeFile(`${dir}/user/${msg.author.id}/${msgArray[2].split(':')[0]}`, msg.content.split(':').slice(1).join(':'), 'utf8', function (err) {
              if (err) { finish('**ERROR :**\n' + err); } else { finish(`**Into __${msgArray[2].split(':')[0]}__** ${msg.content.split(':').slice(1).join(':')}`); }
            });
            break;

          case 'show':
            fs.readFile(`${dir}/user/${msg.author.id}/${ev[msgArray[2]]}`, function (err, data) {
              finish(err ? '**ERROR :**\n' + err : ev[msgArray[2]] + data);
            });
            break;

          case 'rm':
            fs.unlink(`${dir}/user/${msg.author.id}/${ev[msgArray[2]]}`, function (err) {
              finish(err ? '**ERROR :**\n' + err : '**Result :**\nsuccess to delete');
            });
            break;

          default:
            if (ev[msgArray[1]] === undefined) {
              str = '**ERROR :**\nwrong command';
              finish(str);
            } else {
              fs.readFile(`${dir}/user/${msg.author.id}/${ev[msgArray[1]]}`, function (err, data) {
                if (err) { console.log('**ERROR :**\n' + err); }
                data = data.toString().split('\n');
                var runningSchedule = { list: [], count: 0, index: -1, identity: msgArray[1], identityName: ev[msgArray[1]] };
                for (var i in data) {
                  if (data[i] !== '') {
                    var _array = data[i].split(' ');
                    if (!(_array[0].startsWith('#'))) {
                      _array[0] = _array[0].replace(/\s+/, ''); // 왼쪽 공백제거
                      _array[0] = _array[0].replace(/\s+$/g, '');// 오른쪽 공백제거
                      _array[0] = _array[0].replace(/\n/g, ''); // 행바꿈제거
                      _array[0] = _array[0].replace(/\r/g, ''); // 엔터제거
                      runningSchedule.list.push(_array);
                    } else {
                      runningSchedule.list.push(data[i]);
                    }
                    runningSchedule.count++;
                  }
                }
                running(runningSchedule);
              });
            }
            break;
        }
      });
    });
  } catch (e) {
    str = e;
    finish(e);
  }

  function finish (str) { msg.channel.send(`${str} ${msg.author}`); }

  function running (data) {
    data.index++;
    if (data.index < data.count) {
      var _array = data.list[data.index];
      if (!(_array[0].startsWith('#'))) {
        try {
          delete require.cache[require.resolve(`${dir}/function/${_array[0]}.js`)];
          (require(`${dir}/function/${_array[0]}.js`))(msg, _array, client, embed, function () { setTimeout(() => { running(data); }, 700); });
        } catch (e) {
          str = 'command error';
          msg.channel.send(`**ERROR :**\ncommand error ${msg.author}`);
        }
      } else {
        msg.channel.send(data.list[data.index]);
        setTimeout(() => { running(data); }, 300);
      }
    } else {
      str = `[${data.identity}] **${data.identityName}** is now finished`;
      msg.channel.send(`${str} ${msg.author}`);
    }
  }
};
