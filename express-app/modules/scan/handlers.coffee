TablesSoup = require '../../storage/soups/tables-soup'

module.exports =

  index: (req, res) ->

    soup = new TablesSoup

    soup.list()
    .then (tables) ->
      res.send tables


  scan: (req,res) ->
    res.json {ok: true}


  # put: (req, res) ->

  #   tableId = req.body._id
  #   data = req.body

  #   if tableId?

  #     soup = new TablesSoup

  #     soup.put(tableId, data)
  #     .then (error) ->
  #       if error?
  #         res.send error
  #       else
  #         res.json {ok: true}

  #   else
  #     req.next()

  # delete: (req, res) ->

  #   tableId = req.params.table_id

  #   if tableId?

  #     soup = new TablesSoup

  #     soup.delete(tableId)
  #     .then (error) ->
  #       if error?
  #         res.send error
  #       else
  #         res.json {ok: true}
  #   else
  #     req.next()
