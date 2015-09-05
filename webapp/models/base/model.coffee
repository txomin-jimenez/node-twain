# Base model.
module.exports = class Model extends Chaplin.Model
  # Mixin a synchronization state machine.
  _(@prototype).extend Chaplin.SyncMachine

  idAttribute: "_id"

  accessors: null

  type: null

  getAttributes: ->
    data = Chaplin.utils.beget super
    data[k] = @[k].bind(this) for k in fns if fns = @accessors
    data

  initialize: ->
    super

    @save = _.debounce @save, 500

    @on 'request', @beginSync
    @on 'sync', @finishSync
    @on 'error', @unsync

    @on 'invalid', (model,error)=>
      @publishEvent "!application:showAlert",
        type: 'error'
        text: error

  parse: (response,options)->

    _.omit response, ['ok'] if response?


  get: (attr) ->

    if @accessors? and @accessors.indexOf(attr) > -1
      @[attr]()
    else
      super

  set: (key,val,options)->

    super

    if typeof val is 'object'
      opts = val
    else
      opts = options

    if opts?
      autoSave = opts.autoSave

    if autoSave
      @save null,
        error: (model, response) =>
          @publishEvent "!application:showAlert",
            type: 'error'
            timeout: 5000
            text: response

    this

