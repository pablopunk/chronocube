map = require 'map-stream'
coffee = require 'coffee-script'
rext = require 'replace-ext'
cson = require 'cson'

module.exports = (options) ->
  options = {} unless options

  gcson = (file, cb) ->
    json = cson.parse file.contents.toString(), options
    return cb json if json instanceof Error
    file.contents = new Buffer JSON.stringify json
    file.path = rext file.path, '.json'

    cb null, file

  return map gcson
