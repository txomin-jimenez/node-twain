BaseFilesSoup = require '../base-files-soup'

module.exports = class ColumnsSoup extends BaseFilesSoup

  documentType: 'columns'
  typePrefix: 'column'

  byTableName: (tableNameToFilter)->
    tableNameToFilter = "#{@typePrefix}--#{tableNameToFilter}."

    @list (tableName) ->
      tableName.slice(0,tableNameToFilter.length) is tableNameToFilter

  byTableId: (idToFilter)->

    @list null, (columnData) ->
      columnData.table_id is idToFilter
