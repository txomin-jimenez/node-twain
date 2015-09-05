module.exports = (err, req, res, next) ->
  res.status err.status or 500
  res.json
    error:
      env: 'development'
      message: err.message
      error: err