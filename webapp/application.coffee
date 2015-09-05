AlertView = require 'views/alert-view'

# The application object.
module.exports = class Application extends Chaplin.Application
  start: ->
    # You can fetch some data here and start app
    # (by calling `super`) after that.

    window.savedPageStatus = {}

    super

    @subscribeEvent "!application:showAlert", @showAlertMessage

  showAlertMessage: (messageData)->

    opts_ =
      text: ' '
      type: 'information'
      layout: 'bottom'
      theme: 'relax'
      timeout: 1500

    _.extend opts_, messageData

    noty opts_

    # new AlertView
    #   messageData: messageData


