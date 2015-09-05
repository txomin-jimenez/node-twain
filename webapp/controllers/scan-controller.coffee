Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
ScanPageView = require 'views/scan/scan-view'

module.exports = class TablesController extends Controller
  beforeAction: ->
    super

    @reuse 'header', HeaderView, region: 'header'

  index: (params)->

    @indexView = new ScanPageView
      containerMethod: 'html'
      region: 'main'
