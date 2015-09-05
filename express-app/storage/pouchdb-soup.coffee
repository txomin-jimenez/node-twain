fs                  = require 'fs'
Q                   = require 'q'
path                = require 'path'
_                   = require 'lodash'
appConfig           = require '../server/config'

StorageSoup         = require './storage-soup-iface'
PouchDB             = require 'pouchdb'

module.exports = class PouchDBSoup extends StorageSoup

  remoteDB: false
  couchDBApiUrl: 'http://admin:cti123@api.spyrotouch.com:5984/'

  constructor: (options)->

    if options?
      _.extend this, _.pick options, [
        'databaseName'
        'remoteDB'
      ]

    if @databaseName
      if @remoteDB
        @databaseName = @couchDBApiUrl + @databaseName

      @pouchDB = new PouchDB(@databaseName)
    else
      throw new Error "PouchDBSoup requires databaseName!"

  list: (view,options)->

    # retrieve a list of data
    @pouchDB.query(view,options)

  get: (id, options)->

    # Pouchdb get is promise-based
    @pouchDB.get(id,options)

  put: (id, data) ->

    # update / create a document
    @pouchDB.put(id,options)

  delete: (id)->

    # delete a document
    @pouchDB.remove(id,options)