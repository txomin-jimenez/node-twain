View = require 'views/base/view'

module.exports = class HeaderView extends View
  autoRender: true
  # className: 'header'
  # tagName: 'header'
  container: '#header-container'
  containerMethod: 'html'
  template: require './templates/header'
