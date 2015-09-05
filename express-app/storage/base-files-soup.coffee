fs                  = require 'fs'
Q                   = require 'q'
path                = require 'path'
_                   = require 'lodash'
appConfig           = require '../server/config'

StorageSoup         = require './storage-soup-iface'

module.exports = class BaseFilesSoup extends StorageSoup

  documentType: null
  typePrefix: null
  _typePath: null

  baseRepoPath: null

  constructor: (options)->

    if options?
      _.extend this, _.pick options, [
        'documentType'
      ]

    @baseRepoPath = appConfig.get('base_repo_path')

    if options? and options.baseFilesPath?
      baseFilesPath = options.baseFilesPath
    else
      baseFilesPath = appConfig.get('base_repo_path')

    if baseFilesPath?
      @_typePath = path.join(baseFilesPath, @documentType)
    else
      throw new Error "BaseFilesSoup requires baseFilesPath!"

  list: (filenamesFilterFn,dataFilterFn)->

    deferred = Q.defer()

    fs.readdir @_typePath, (err, fileNames) =>
      files = []

      if err?
        console.log err

      if typeof filenamesFilterFn is 'function'
        fileNames = fileNames.filter(filenamesFilterFn)


      for fileName in fileNames
        fileJson = JSON.parse @_readFile(path.join(@_typePath,fileName))

        # Aplicar filtro si se desea
        if typeof dataFilterFn is 'function'
          if dataFilterFn(fileJson)
            files.push fileJson
        else
          files.push fileJson

      deferred.resolve(files)

    deferred.promise

  get: (id)->
    # id = @_cleanFileName(id)

    # @list (fileName) ->
    #   fileName.slice(0,id.length) is id
    id = path.join(@_typePath,@_cleanFileName(id)) + '.json'

    Q.fcall =>
      JSON.parse @_readFile(id)

  put: (id, data) ->

    id = path.join(@_typePath,@_cleanFileName(id)) + '.json'

    @_writeFile(id,data)


  delete: (id)->

    id = path.join(@_typePath,@_cleanFileName(id)) + '.json'

    @_deleteFile(id)

  _readFile: (filePath) ->
    # Se usa API sincrona para no tener demasiados descriptores abiertos
    # a la vez a la hora de listar. Pendiente mejorar.
    fs.readFileSync filePath, {encoding: 'utf-8'}

  _writeFile: (filePath, data) ->
    deferred = Q.defer()

    fs.writeFile filePath, JSON.stringify(data, null, 2), {encoding: 'utf-8'}, (err) ->
      deferred.resolve(err)

    deferred.promise

  _deleteFile: (filePath) ->
    deferred = Q.defer()

    fs.unlink filePath, (err) ->
      deferred.resolve(err)

    deferred.promise

  _cleanFileName: (fileName) ->
    fileName.replace("::","--")

  _reverseCleanedFileName: (fileName)->

    fileName.replace("--","::")






