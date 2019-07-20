module.exports = (message, array, client, embed, port, back) => {
  const request = require('request')
  const options = {
    uri: `http://localhost:${port}`,
    method: 'POST',
    body: {
      func: 'run',
      image: array[1],
      name: array[1].split('/')[0],
      port: array[2],
      directory: array[3]
    },
    json: true
  }

  request.post(options, (err, res, body) => {
    let send_string = body.string
    if (body.success) {
      send_string = `${message.author} **200 OK**\n\`\`\`\n${send_string}\n\`\`\``
    } else {
      send_string = `${message.author} **500 ERROR**\n\`\`\`\n${body.reason.message}\n\`\`\``
    }

    if (send_string.length > 2000) {
      for (let i = 0; i < send_string.length; i += 2000) {
        message.channel.send(send_string.substr(i, 2000))
      }
    } else if (send_string.length > 0) {
      message.channel.send(send_string)
    }
    back()
  })
}
