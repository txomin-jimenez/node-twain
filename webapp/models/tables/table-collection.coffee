BaseCollection = require 'models/base/collection'
TableModel = require 'models/tables/table-model'

module.exports = class TableCollection extends BaseCollection

  model: TableModel
  url: '/api/tables'

  comparator: 'name' # por defecto ordenar por nombre