module.exports = (message, array, client, embed, port, back) => {
  // Development Tweet
  // 1. 가로로 7개
  // 2. `1` 인덱스가 이미지를 가리킴

  const request = require('request')
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
      var lists = (body.string).split('\n')
      var running_cycle = { index: -1, count: 0, list: [] }
      for (var index in lists) {
        if (!(lists[index] == '')) {
          if (lists[index].indexOf(array[1]) > -1) {
            running_cycle.count++
            running_cycle.list.push(lists[index].split(':')[1])
          }
        }
      }

      delete_containers(running_cycle)
    } else {
      message.channel.send(`${message.author} **500 ERROR**\n\`\`\`\n${body.reason.message}\n\`\`\``)
      back()
    }
  })

  function delete_containers (data) {
    data.index++
    if (data.index < data.count) {
      try {
        var _array = ['ps', data.list[data.index]];
        (require(`./rm.js`))(message, _array, client, embed, port, () => { setTimeout(() => { delete_containers(data) }, 100) })
      } catch (e) {
        message.channel.send(data.list[data.index])
      }
    } else {
      back()
    }
  }
}
