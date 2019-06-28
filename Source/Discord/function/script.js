module.exports = (message, array, client, embed, port, back) => {
    const fs = require("fs");
    var _str = "", _str2 = "**200 OK**";

    try{
        fs.stat(`./User/${message.author.id}`, (err) => {
            if (err)
                message.channel.send(`${message.author} **500 ERROR**\n\`\`\`\n\프리셋 초기 설정이 완료되지 않았습니다\n--scripts 명령어로 설정을 완료하여주세요\n\`\`\``);
            else {
                fs.readdir(`./User/${message.author.id}`, (err3, ev) => {
                    if (err3) {
                        _str2 = "**500 ERROR**"
                        _str = "유저 프리셋 로드에 문제가 발생했습니다\n해당 문제를 관리자에게 알려주세요\n\nGameBoy5141@gmail.com";
                        finish();
                    }

                    else {
                        if (ev.length == 0) {
                            _str2 = "**500 ERROR**"
                            _str = "프리셋 파일이 존재하지 않습니다\n--script set [NAME]:\n\` \` \`\n명령어 집합\n\` \` \`\n\n 으로 만들어주세요";
                        }

                        switch (array[1]) {
                            case "list":
                                for (var i = 0; i < ev.length; i++) {
                                    var file = ev[i];
                                    _str += `[${i}] ${file}\n`
                                }
                                finish();
                                break;

                            case "set":
                                fs.writeFile(`./User/${message.author.id}/${array[2].split(":")[0]}`, message.content.split("```")[1].split("```")[0],  'utf8', (err) => {
                                    if (err) {
                                        _str2 = "**500 ERROR**"
                                        _str = err;
                                    }else {
                                        _str2 = "**200 OK**"
                                        _str = `**Into __${array[2].split(":")[0]}__**`
                                        _str += message.content.split(":")[1]
                                    }

                                    message.channel.send(`${message.author} ${_str2}\n${_str}`);
                                });
                                break;

                            case "show":
                                fs.readFile(`./User/${message.author.id}/${ev[array[2]]}`, (err, data)=>{
                                    _str = ev[array[2]] +"\n\n" + data;
                                    if (err) {
                                        _str2 = "**500 ERROR**"
                                        _str = err;
                                    }

                                    finish();
                                });
                                break;

                            case "rm":
                                fs.unlink(`./User/${message.author.id}/${ev[array[2]]}`, (err)=>{
                                    if (err) {
                                        _str2 = "**500 ERROR**"
                                        _str = err;
                                        finish();
                                    }else {
                                        _str2 = "**200 OK**"
                                        message.channel.send(`${message.author} ${_str2}`);
                                    }
                                });
                                break;

                            default:
                                if (ev[array[1]] == undefined) {
                                    _str2 = "**500 ERROR**"
                                    _str = "명령어를 잘못 입력하셨습니다"
                                    finish();
                                } else {
                                    fs.readFile(`./User/${message.author.id}/${ev[array[1]]}`, (err, data) => {
                                        data = data.toString().split("\n");
                                        running_schedule = { list: [], count: 0, index: -1, identity : array[1], identity_name : ev[array[1]] };
                                        for (var i in data) {
                                            if (data[i] != "") {
                                                var _array = data[i].split(' ');
                                                if (!(_array[0].startsWith("#"))) {
                                                    _array[0] = _array[0].replace(/\s+/, "");  //왼쪽 공백제거
                                                    _array[0] = _array[0].replace(/\s+$/g, "");//오른쪽 공백제거
                                                    _array[0] = _array[0].replace(/\n/g, "");  //행바꿈제거
                                                    _array[0] = _array[0].replace(/\r/g, "");  //엔터제거
                                                    running_schedule.list.push(_array);
                                                } else {
                                                    running_schedule.list.push(data[i]);
                                                }
                                                running_schedule.count++;
                                            }
                                        }
                                        running(running_schedule);
                                    });
                                }
                                break;
                        }
                    }
                });
            }
        });
    }catch(e){
        _str2 = "**500 ERROR**";
        _str = e
        finish();
    }
    
    function finish() {
        message.channel.send(`${message.author} ${_str2}\n\`\`\`\n${_str}\n\`\`\``);
    }

    function running(data) {
        data.index++;
        if (data.index < data.count) {
            var _array = data.list[data.index];
            if (!(_array[0].startsWith("#"))) {
                try {
                    delete require.cache[require.resolve(`./${_array[0]}.js`)];
                    (require(`./${_array[0]}.js`))(message, _array, client, embed, port, () => { setTimeout(() => { running(data); }, 1000); });

                } catch (e) {
                    _str2 = "**500 ERROR**"
                    _str = "명령어를 잘못 입력하셨습니다"
                    finish();
                }
            } else {
                message.channel.send(data.list[data.index]);
                setTimeout(() => { running(data); }, 1000);
            }
        }else if(data.index == data.count){
            _str = `프리셋 [${data.identity}]번 - [${identity_name}]의 실행을 끝마쳤습니다`
            finish();
        }
    }
}