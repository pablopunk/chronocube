var temp = require('./lib/temp')

function validTemplate (template) {
  var re = /(^|[^%])(%%)*%s/
  var first = re.exec(template)
  if (first === null) return false

  var pos = first.index + first[0].length
  var second = re.exec(template.substring(pos))
  if (second !== null) return false

  return true
}

function template (template) {
  if (typeof template !== 'string') {
    throw new TypeError('template is not a string')
  }

  if (validTemplate(template) !== true) {
    throw new Error('template must contain replacement token %s exactly once')
  }

  return {
    open: temp.open.bind(temp, template),
    openSync: temp.openSync.bind(temp, template),
    mkdir: temp.mkdir.bind(temp, template),
    mkdirSync: temp.mkdirSync.bind(temp, template),
    writeFile: temp.writeFile.bind(temp, template),
    writeFileSync: temp.writeFileSync.bind(temp, template),
    createWriteStream: temp.createWriteStream.bind(temp, template)
  }
}

module.exports = template('%s')
module.exports.template = template
