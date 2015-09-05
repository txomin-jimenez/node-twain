Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
SetupPageView = require 'views/setup/setup-view'

SetupModel = require 'models/setup/setup-model'

module.exports = class SetupController extends Controller
  beforeAction: ->
    super
    @reuse 'header', HeaderView, region: 'header'

  show: ->

    @setupModel = new SetupModel
    @setupModel.fetch()

    @view = new SetupPageView
      region: 'main'
      model: @setupModel


  checkSetup: ->

    Q.fcall -> true