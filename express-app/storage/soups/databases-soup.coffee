fs                  = require 'fs'
Q                   = require 'q'
path                = require 'path'
_                   = require 'lodash'
request             = require 'request'
# appConfig           = require '../server/config'

#PouchDBSoup         = require '../pouchdb-soup'

RabbitMQChnl         = require '../../lib/rabbit-mq'

module.exports = class DatabasesSoup # extends PouchDBSoup

  couchDBApiUrl: 'http://admin:cti123@api.spyrotouch.com:5984/'

  constructor: (options)->



  list: (options)->

    @_ajax(@couchDBApiUrl + '_all_dbs')
    .then (response) =>
      if response.result?
        databases = _.filter response.result, (dbName) ->
          dbName.substr(0,4) is 'tch_'

        Q.allSettled(_.map(databases, (dbName) =>
          @_ajax(@couchDBApiUrl + dbName)
          .then (result)->
            if result.err?
              result.value =
                _id: dbName
                db_name: dbName
            else
              result.result?._id = dbName
              result.result
        )).then (results) ->
          _.pluck results, 'value'

  get: (dbName)->

    @_ajax(@couchDBApiUrl + dbName)
    .then (response) =>
      response.result


  _ajax: (url,parseJSON=true)->

    deferred = Q.defer()

    request.get
      url: url
    , (err, httpResponse, body) ->
      console.log body
      console.log err
      body = JSON.parse(body) if parseJSON
      if err
        deferred.resolve
          err: err
          result: null
      else if body.error is 'unauthorized'
        deferred.resolve
          err: body.error
          result: null
      else
        deferred.resolve
          err: null
          result: body

    deferred.promise