module.exports = (message, array, client, embed, port, back) => {
    const fs = require("fs");
    var _str = "", _str2 = "**200 OK**";
    fs.stat(`./Source/User/${message.author.id}`, (err)=>{
        if(err) {
            // 최초 유저 설정
            fs.mkdir(`./Source/User/${message.author.id}`, (err2)=>{
                if(err2) {
                    _str2 = "**500 ERROR**"
                    _str = "유저 프리셋 초기 설정에 문제가 발생했습니다\n해당 문제를 관리자에게 알려주세요\n\nGameBoy5141@gmail.com";
                    finish();
                }
                
                else {
                    _str = "유저 프리셋 초기 설정을 진행하였습니다";
                    finish();
                }
            });
        }
        
        
        else{
            fs.readdir(`./Source/User/${message.author.id}`, (err3 , ev)=>{
                if(err3) {
                    _str2 = "**500 ERROR**"
                    _str = "유저 프리셋 로드에 문제가 발생했습니다\n해당 문제를 관리자에게 알려주세요\n\nGameBoy5141@gmail.com";
                    finish();
                }

                else{
                    if(ev.length == 0) {
                        _str2 = "**500 ERROR**"
                        _str = "프리셋 파일이 존재하지 않습니다.\n--script set [NAME]:\n\` \` \`\n명령어 집합\n\` \` \`\n\n 으로 만들어주세요";
                    }
                    
                    for (var i = 0; i < ev.length; i++) {
                        var file = ev[i];
                        _str += `[${i}] ${file}\n`
                    }
                    finish();
                }
            });
        }
    });

    function finish() {
        message.channel.send(`${message.author} ${_str2}\n\`\`\`\n${_str}\n\`\`\``);
        back();
    }
}