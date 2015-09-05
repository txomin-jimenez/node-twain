_                         = require 'lodash'
fs                        = require 'fs'
nconf                     = require 'nconf'


isConfigured = ->

  outputPath = nconf.get('scan_ouptut_path')

  stats = fs.lstatSync outputPath

  outputPath? and outputPath.length > 0 and stats.isDirectory()

####

configAttrs = [
  'scan_ouptut_path'
]

module.exports =

  get: (req,res) ->

    res.send _.pick nconf.get(), configAttrs

  put: (req, res) ->

    if req.body?
      for attrKey in Object.keys(req.body)
        if configAttrs.indexOf(attrKey) > -1
          nconf.set attrKey, req.body[attrKey]

    nconf.save()

    if isConfigured()
      res.send {ok: true}
    else
      res.status(400)
      res.send('not-configured')


  isConfigured:  (req, res, next) ->

    if isConfigured()
      res.send {ok: true}
    else
      res.status(423)
      res.send('not-configured')

  check: (req, res, next) ->

    if isConfigured()
      next()
    else
      res.status(423)
      res.send('not-configured')