View = require 'views/base/view'

Utils = require 'lib/utils'

Scanner = require 'lib/scanner'

module.exports = class ScanView extends View
  autoRender: true
  className: 'scan-page'
  template: require './templates/scan-page'

  events:
    'click #scanButton': 'scan'
  #   'click .order-by-name': 'orderByName'
  #   'click .order-by-alias': 'orderByAlias'

  render: ->

    super

  scan: ->

    Scanner.scan()