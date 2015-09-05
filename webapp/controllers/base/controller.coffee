SiteView = require 'views/site-view'

module.exports = class Controller extends Chaplin.Controller


  constructor: ->

    super

    # before_ = @beforeAction

    # @beforeAction = ->
    #   deferred = Q.defer()
    #   @checkSetup()
    #   .then =>
    #     before_.apply this, arguments
    #     deferred.resolve()
    #   deferred.promise
    # ####


  # Reusabilities persist stuff between controllers.
  # You may also persist models etc.
  beforeAction: ->
    $.noty.closeAll() # eliminar notificaciones pendientes

    @reuse 'site', SiteView



  checkSetup: ->

    deferred = Q.defer()

    $.ajax
      type: 'GET'
      url: '/api/setup/is_configured'
      dataType: "json"
      success: ->
        deferred.resolve()
      error: (err)=>
        @publishEvent "!application:showAlert",
          type: 'information'
          text: 'Configuración necesaria'

        Chaplin.utils.redirectTo
          controller: 'setup'
          action: 'show'

        deferred.reject()

    deferred.promise