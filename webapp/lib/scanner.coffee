

module.exports =

  scan: ->

    $.get "/api/scan", ->
      alert "ok"

