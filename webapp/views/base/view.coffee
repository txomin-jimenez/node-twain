require 'lib/view-helper' # Just load the view helpers, no return value

module.exports = class View extends Chaplin.View
  # Auto-save `template` option passed to any view as `@template`.
  optionNames: Chaplin.View::optionNames.concat ['template']

  _rendered: false

  renderAnimation: 'fadeIn'

  constructor: (options={})->

    if @renderAnimation?
      if options.className?
        options.className = options.className + " animated #{@renderAnimation}"
      else
        @className = @className + " animated #{@renderAnimation}"

    super

    #if @className?
      #window.savedPageStatus[@className] ||= {}
      #@currentParams = window.savedPageStatus[@className]

  # Precompiled templates function initializer.
  getTemplateFunction: ->
    @template

  render: ->
    @_rendered = false

    super

    @_rendered = true
    @trigger 'rendered'

    this

  reattach: ->

    @attach()

    # backbone.js libera los eventos de DOM al de-attachar
    # volver a asignarlos
    @delegateEvents()

    # reactivar eventos de dom en views hijas
    for subview in @subviews
      subview.reattach()

    this

  attach: ->

    super

    #databindings...
    if @model?
      @stickit() if typeof @stickit is 'function'

  whenRendered: ->

    deferred = Q.defer()

    if @_rendered
      deferred.resolve()
    else
      @listenToOnce this, 'rendered', ->
        deferred.resolve()

    deferred.promise

  dispose: ->

    #databindings...
    if @model?
      @unstickit() if typeof @stickit is 'function'


    properties = [
      'currentParams',
    ]

    delete this[prop] for prop in properties

    super
