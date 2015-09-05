handlers = require './handlers'

module.exports = (app) ->

  app.get "/api/setup/is_configured", handlers.isConfigured

  app.get "/api/setup", handlers.get
  app.put "/api/setup", handlers.put
  app.post "/api/setup", handlers.put

  # comprobar en todas las llamadas si la configuracion es correcta
  # en caso contrario no continuar
  # app.all '/api/*', handlers.check
