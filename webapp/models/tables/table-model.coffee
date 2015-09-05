BaseModel = require 'models/base/model'
Utils = require 'lib/utils'

ColumnCollection = require 'models/columns/column-collection'

module.exports = class TableModel extends BaseModel

  @calulateNextAlias: (aliasList)->
    aliasList.sort(Utils.naturalCmp)
    aliasList = _.sortBy aliasList, (alias) ->
      if alias.charCodeAt(0) < 97
        Array(alias.length).join("\ufff0") + alias
      else
        alias
    ####

    console.log aliasList

    lastAlias = aliasList[aliasList.length-1]

    lastAlias.substr(0,lastAlias.length-1) + String.fromCharCode(lastAlias.charCodeAt(lastAlias.length-1) + 1)
  ####

  idPrefix: "table"

  tableNamesList: null
  columnCollection: null

  defaults:
    _id: "table::"
    type: 'table'

  accessors: [
              'aliasIntValue'
  ]

  initialize: (attrs,options)->
    super

    if not attrs? and options?.aliasList
      @set 'alias', TableModel.calulateNextAlias(options.aliasList)

    if not attrs? and options?.tableNamesList
      @tableNamesList = options.tableNamesList

    @columnCollection = new ColumnCollection
      tableParent: this

    @nameChanged = _.debounce @nameChanged, 500
    @listenTo this, 'change:name', @nameChanged

  url: ->
    return '/api/tables/' + @get('_id')

  aliasIntValue: ->
    alias = @get('alias')

    if alias.length is 1 and alias.charCodeAt() < 97
      26 + (Utils.base26ToInt(alias) / 100)
    else
      if alias is '$pl'
        -1000000
      else
        Utils.base26ToInt(alias)

  validate: (attrs, options)->

    errors = ""

    if not attrs.alias? or attrs.alias.length is 0
      errors = errors + "\nEl alias es un dato obligatorio."

    if not attrs.name? or attrs.name.length is 0
      errors = errors + "\nEl nombre es un dato obligatorio."
    else
      if @tableNamesList? and @tableNamesList.length > 0
        if @tableNamesList.indexOf(attrs.name) > -1
          errors = errors + "\nYa existe una tabla con el mismo nombre"

    if errors.length is 0
      errors = null

    errors

  nameChanged: ->

    @set {_id: "#{@idPrefix}::#{@get('name')}"}


  getColumn: (alias) ->

    if @columnCollection?
      @columnCollection.findWhere {alias: alias}

  dispose: ->

    return if @disposed

    @columnCollection.dispose() if @columnCollection?

    properties = [
      'tableNamesList'
      'columnCollection'
    ]

    delete this[prop] for prop in properties

    super

