View = require 'views/base/view'

module.exports = class AlertView extends View
  region: 'alerts'
  template: require './templates/alert'
  autoRender: true

  constructor: (options)->

    if options?
      _.extend this, _.pick options, [
        'messageData'
      ]

    super

  render: ->

    super

    # Auto ocultarlo
    setTimeout =>
      @dispose()
    , 10000

    @$('.alert').on 'closed.bs.alert', =>
      @dispose()

  getTemplateData: ->

    @messageData

  dispose: ->

    return if @disposed

    properties = [
      'messageData',
    ]

    delete this[prop] for prop in properties

    super