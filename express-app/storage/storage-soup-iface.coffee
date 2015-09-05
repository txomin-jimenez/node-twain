# fs                  = require 'fs'
Q                   = require 'q'
# path                = require 'path'
# _                   = require 'lodash'


module.exports = class StorageSoup

  constructor: (options)->

    # if options?
    #   _.extend this, _.pick options, [
    #     'xxxx'
    #   ]

    # init storage here
    #  - db connection
    #  - file paths
    #  - ....

  list: (options)->

    # retrieve a list of data
    Q()

  get: (id)->

    # get a document
    Q()

  put: (id, data) ->

    # update / create a document
    Q()

  delete: (id)->

    # delete a document
    Q()