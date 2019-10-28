module.exports = (message, array, client, embed, port, back) => {
  try {
    async function clear () {
      const fetched = await message.channel.fetchMessages({ limit: 99 })
      message.channel.bulkDelete(fetched)
    }
    clear()
    back()
  } catch (e) {
    message.channel.send(e)
  }
}
