module.exports = (app) ->

  # punto de entrada a la webapp
  app.get "/", (req, res) ->
    res.render "index"