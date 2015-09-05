View = require 'views/base/view'

Utils = require 'lib/utils'

module.exports = class SetupView extends View
  autoRender: true
  className: 'setup-page'
  template: require './templates/setup'

  bindings:
    '#baseRepoPath': 'base_repo_path'

  events:
    'click #saveButton': "saveSetup"


  saveSetup: ->
    opts =
      success: =>
        console.log "save setup success!"

        Chaplin.utils.redirectTo
          url: '/'

      error: (model, response) =>
        @publishEvent "!application:showAlert",
          type: 'error'
          text: Utils.i18n_('c','setup:invalid_setup_msg')

    @model.save null, opts