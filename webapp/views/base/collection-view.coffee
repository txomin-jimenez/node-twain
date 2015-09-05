View = require './view'

Utils = require 'lib/utils'

$ = Backbone.$

toggleElement = do ->
  if $
    (elem, visible) -> elem.toggle visible
  else
    (elem, visible) ->
      elem.style.display = (if visible then '' else 'none')


module.exports = class CollectionView extends Chaplin.CollectionView
  # This class doesn’t inherit from the application-specific View class,
  # so we need to borrow the method from the View prototype:
  getTemplateFunction: View::getTemplateFunction

  useCssAnimation: true

  # para los items (feature de chaplin)
  animationStartClass: 'animated fadeIn'
  animationEndClass: 'animated fadeIn'

  # para la view principal (feature nuestra)
  renderAnimation: 'fadeIn'

  _rendered: false

  searchFieldSelector: null
  defaultFilterAttr: null
  defaultFilterValue: null

  constructor: (options={})->

    if @searchFieldSelector?
      @events["keyup #{@searchFieldSelector}"] = 'filterList'

    if @renderAnimation?
      if options.className?
        options.className = options.className + " animated #{@renderAnimation}"
      else
        @className = @className + " animated #{@renderAnimation}"

    if options.defaultFilterValue?
      @defaultFilterValue = options.defaultFilterValue

    super

    onScreenResize = @onScreenResize
    @onScreenResize = _.debounce( =>

        onScreenResize.apply this, arguments
    , 100)

    # eventos jQuery con namespace para poder liberarlo luego en dispose..
    $(window).on("resize.onScreenResize_#{@cid}" , @onScreenResize)
    $(window).on("orientationchange.onScreenResize_#{@cid}", @onScreenResize)

  initialize: ->

    super

    @loadLastParams()

  loadLastParams: ->
    # Almacenar en window parametros de listado para recuperar estado si se
    # vuelve al listado por 2da vez en adelante
    id_ = @collection?.tableParent?.id
    listViewID = "#{@className}_#{id_}"

    window.savedPageStatus[listViewID] ||= {}
    @currentParams = window.savedPageStatus[listViewID]

    @currentParams.filterAttr ||= @defaultFilterAttr or 'name'

    if @defaultFilterValue? and not @currentParams.filterValue?
      @currentParams.filterValue = @defaultFilterValue

    @orderByAttr(@currentParams.filterAttr, @currentParams.filterValue)

  render: ->
    @_rendered = false

    super

    @adjustSearchField(@currentParams.filterAttr,@currentParams.filterValue)

    @_rendered = true
    @trigger 'rendered'

    this

  attach: ->

    super

    @adjustListHeight()

    @adjustScrollPosition()

  onScreenResize: ->

    @adjustListHeight()

    # implementar en cada vista el proceso de ajuste de DOM cuando cambia
    # el tamaño de pantalla si es necesario


  adjustListHeight: ->

    adjust_ = (containerIsModal=false)=>
      calcHeight_ = $(window).height() - @$(@listSelector).offset().top - 20

      if calcHeight_ < 250
        calcHeight_ = 250

      if containerIsModal
        calcHeight_ = calcHeight_ - 20

      @$(@listSelector).height calcHeight_
    ####

    # listado dentro de modal ajustar cuando este visible para calcular
    # correctamente el alto
    if @$('.modal').length > 0
      if $('.modal').attr('aria-hidden') is "false"
        adjust_(true)
      else
        @$('.modal').on 'shown.bs.modal', =>
          adjust_(true)
    else
      adjust_()


  adjustScrollPosition: ->

    if @currentParams.scrollTop?
      @$(@listSelector).scrollTop @currentParams.scrollTop

  adjustSearchField: (fieldName,value)->
    if @searchFieldSelector?
      @whenRendered()
      .then =>
        @$(@searchFieldSelector).val(value)
        @$(@searchFieldSelector).attr 'placeholder', Utils.i18n_('c','search_by_term',{term: Utils.i18n_('t',fieldName)})

  filterList: (event, value)->

    if @searchFieldSelector?
      if value?
        @$(@searchFieldSelector).val(value)
      else
        value = @$(@searchFieldSelector).val()

    if value?
      @filter (model)=>
        @filterFN(model,value)

    @currentParams.filterValue = value

  filterFN: (model,value) =>
    value_ = model.get(@currentParams.filterAttr)
    if value_?
      value_.toLowerCase().indexOf(value.toLowerCase()) > -1
    else
      false

  orderByAttr: (attrName,filterValue='')->

    @whenRendered()
    .then =>
      @currentParams.filterAttr = attrName
      @currentParams.filterValue = filterValue

      comparatorAttr_ = @currentParams.filterAttr
      if comparatorAttr_ is 'alias'
        comparatorAttr_ = 'aliasIntValue'
      @collection.comparator = (model) =>
        value = model.get(comparatorAttr_)
        value
      ####
      @adjustSearchField(@currentParams.filterAttr,@currentParams.filterValue)
      @filterList(null,filterValue)
      @collection.sort()

  saveScrollInfo: =>
    @currentParams.scrollTop = @$(@listSelector).scrollTop()

  # sobrecargada esta funcion porque no se mostraba bien los registros nuevos
  # tomaba display=inline el elemento y fastidiaba el aspecto q boostrap le daba
  filterCallback: (view, included) ->
    view.$el.stop(true, true) if $
    view.el.style.display = 'block'
    toggleElement (if $ then view.$el else view.el), included

  # sobrecargar funcion de chaplin para poder pasar al constuctor de la view-item
  # el callback de guardar el scroll
  initItemView: (model) ->
    if @itemView
      new @itemView {autoRender: false, model, saveScrollPosition: @saveScrollInfo}
    else
      throw new Error 'The CollectionView#itemView property ' +
        'must be defined or the initItemView() must be overridden.'

  # metodo especial usado para vistas de tabs para cachearlas / reañadirlas
  reattach: ->

    @attach()

    # backbone.js libera los eventos de DOM al de-attachar
    # volver a asignarlos
    @delegateEvents()

    # reactivar eventos de dom en views hijas
    for subview in @subviews
      subview.reattach()

    this

  whenRendered: ->

    deferred = Q.defer()

    if @_rendered
      deferred.resolve()
    else
      @listenToOnce this, 'rendered', ->
        deferred.resolve()

    deferred.promise

  dispose: ->
    return if @disposed

    $(window).off(".onScreenResize_#{@cid}")


    properties = [
      'currentParams',
    ]

    delete this[prop] for prop in properties

    super
