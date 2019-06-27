module.exports = (message, array, client, embed, port, back) => {
    // Development Tweet
    // 1. 가로로 7개
    // 2. `1` 인덱스가 이미지를 가리킴

    const request = require('request');
    var options = {
        uri: `http://localhost:${port}`,
        method: 'POST',
        body: {
            func: 'ps',
            name: array[1]
        },
        json: true
    }
    
    request.post(options, (err, res, body) => {
        if (body.success) {
            delete_containers(body.string, back);
            //send_string = `${message.author} **200 OK**\n\`\`\`\n${send_string}\n\`\`\``
        }else{
            message.channel.send(`${message.author} **500 ERROR**\n\`\`\`\n${body.reason.message}\n\`\`\``);
            back();
        }
    });

    function delete_containers(data, back){
        // delete containers
        var lists = data.split("\n");
        for(var index in lists) {
            if (!(lists[index] == "")) {
                if(lists[index].indexOf(array[1])){
                    var _array = ["ps", lists[index].split(":")[1]];
                    (require(`./rm.js`))(message, _array, client, embed, port, ()=>{});
                }
            }
        }
        back();
    }
}