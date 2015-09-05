BaseModel = require 'models/base/model'
Utils = require 'lib/utils'

module.exports = class SetupModel extends BaseModel

  idAttribute: '_id'

  initialize: (attrs,options)->


  url: ->
    '/api/setup'
