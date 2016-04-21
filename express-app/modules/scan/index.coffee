handlers = require './handlers'

module.exports = (app) ->

  app.get "/api/preview", handlers.preview
  app.get "/api/scan", handlers.scan

  # app.get "/api/scan/:table_id", handlers.get
  # app.put "/api/tables/:table_id", handlers.put
  # app.delete "/api/tables/:table_id", handlers.delete
