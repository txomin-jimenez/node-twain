View = require 'views/base/view'

Utils = require 'lib/utils'

Scanner = require 'lib/scanner'

module.exports = class ScanView extends View
  autoRender: true
  className: 'scan-page'
  template: require './templates/scan-page'

  events:
    'click #scanButton': 'scan'

  render: ->

    super

  scan: ->

    options = {}

    Scanner.preview()
    .then (previewImage) =>

      @showPreview(previewImage)

      Scanner.scan()
    .then =>
      @publishEvent "!application:showAlert",
        type: 'information'
        text: 'Image scanned successfully!'

    .catch (err) =>
      console.error err
      @publishEvent "!application:showAlert",
        type: 'error'
        text: err

  showPreview: (scannedImageRes) =>
    @$('img.scanned-img').attr 'src', scannedImageRes

  saveImage: (scannedImage) =>

    # window.open scannedImage, '_blank'
    window.location.assign scannedImage