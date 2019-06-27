module.exports = (token, port, startletter) => {
    const fs = require('fs');
    const colors = require('colors');
    const discord = require('discord.js');
    const client = new discord.Client();
    const embed = discord.RichEmbed;

    client.login(token);
    client.on("ready", ()=>{
        client.user.setStatus('available');
        client.user.setPresence({
            game: {
            name: '--help',
            type: "STREAMING",
            url: "https://www.twitch.tv/libertycode"
            }
        });
    });

    client.on("message", (message) => {
        let array = message.content.split(' ');
        if (array[0].startsWith(startletter)) {
            try {
                switch(array[0]) {
                    case "--sc":
                        array[0] = "--script";
                        break;

                    case "--scs":
                        array[0] = "--scripts";
                        break;
                }
                delete require.cache[require.resolve(`./function/${array[0].split(startletter)[1]}.js`)];
                (require(`./function/${array[0].split(startletter)[1]}.js`))(message, array, client, embed, port, ()=>{});
            } catch(e) {
                //console.log(e)
            }
        }
    });
}