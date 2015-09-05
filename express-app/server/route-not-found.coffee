module.exports = (req, res, next) ->
  err = new Error("Not Found")
  err.status = 404
  next err