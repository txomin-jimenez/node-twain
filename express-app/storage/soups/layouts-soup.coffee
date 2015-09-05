BaseFilesSoup = require '../base-files-soup'

module.exports = class LayoutsSoup extends BaseFilesSoup

  documentType: 'layouts'
  typePrefix: 'appcontent'

  designs: ->
    filter_ = "#{@typePrefix}--"

    @list (layoutName) ->
      layoutName.slice(0,filter_.length) is filter_

  designsByModule: (moduleName)->
    moduleToFilter = "#{@typePrefix}--#{moduleName}."

    @list (layoutName) ->
      layoutName.slice(0,moduleToFilter.length) is moduleToFilter