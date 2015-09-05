View = require 'views/base/view'

Utils = require 'lib/utils'

module.exports = class ScanView extends View
  autoRender: true
  className: 'scan-page'
  template: require './templates/scan-page'

  # events:
  #   'click a.new-table-option': 'openNewTablePage'
  #   'click .order-by-name': 'orderByName'
  #   'click .order-by-alias': 'orderByAlias'

  render: ->

    super

