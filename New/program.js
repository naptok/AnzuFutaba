const fs = require('fs');
const ini = require('ini');
const discord = require('discord.js');
const client = new discord.Client();
const embed = discord.RichEmbed;
const config = ini.parse(fs.readFileSync('./SETUP.ini', 'utf-8'));

if (!config.discord.token) { console.error('Token is not available'); process.exit(0); }
config.discord.startLetter = config.discord.startLetter || '--';
client.login(config.discord.token);

client.on('ready', function () {
  client.user.setStatus('available');
  client.user.setPresence({ game: { name: config.discord.text || '--help', type: config.discord.type || '', url: config.discord.url || '' } });
});

client.on('message', function (msg) {
  const msgArray = msg.content.split(' ');
  if (msg.author.bot) return undefined;
  if (!msgArray[0].startsWith(config.discord.startLetter)) return undefined;

  try {
    msgArray[0] = msgArray[0] === `${config.discord.startLetter}sc` ? `${config.discord.startLetter}script` : msgArray[0];
    msgArray[0] = msgArray[0] === `${config.discord.startLetter}scs` ? `${config.discord.startLetter}scripts` : msgArray[0];
    msgArray[0] = msgArray[0] === `${config.discord.startLetter}image` ? `${config.discord.startLetter}img` : msgArray[0];
    msgArray[0] = msgArray[0] === `${config.discord.startLetter}images` ? `${config.discord.startLetter}img` : msgArray[0];

    delete require.cache[require.resolve(`/${__dirname}/function/${msgArray[0].split(config.discord.startLetter)[1]}.js`)];
    (require(`/${__dirname}/function/${msgArray[0].split(config.discord.startLetter)[1]}.js`))(msg, msgArray, client, embed, function () {});
  } catch (e) {
    // console.log(e);
  }
  /* if (msgArray[0].startsWith(config.discord.startLetter)) {
    try {
      switch (msgArray[0]) {
        case '--sc':
          msgArray[0] = '--script';
          break;

        case '--scs':
          msgArray[0] = '--scripts';
          break;
      }
      delete require.cache[require.resolve(`./function/${msgArray[0].split(config.discord.startLetter)[1]}.js`)];
      (require(`./function/${msgArray[0].split(config.discord.startLetter)[1]}.js`))(msg, msgArray, client, embed, () => {});
    } catch (e) {
      // console.log(e)
    }
  } */
});
