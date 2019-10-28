module.exports = (body, moduleControl) => {
  const async = require('async')
  const exec = require('child_process').exec
  moduleControl.json_temp.string = ''

  exec(`docker rm -f ${body.containerid}`, (err, stdout, stderr) => {
    if (err) { moduleControl.reject({ message: err.message, stack: err.stack }) } else {
      moduleControl.json_temp.string = stdout
      moduleControl.json_temp.success = true
      moduleControl.resolve()
    }
  })
}
