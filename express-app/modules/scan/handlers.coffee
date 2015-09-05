TablesSoup = require '../../storage/soups/tables-soup'

cmwTwainCmd = "C:\\CmdTwain\\CmdTwain.exe"

module.exports =

  index: (req, res) ->

    soup = new TablesSoup

    soup.list()
    .then (tables) ->
      res.send tables


  scan: (req,res) ->

    outputFile = "Z:\\scanner\\scan1.jpg"

    child_process = require('child_process')

    child_process.execSync("#{cmwTwainCmd} #{outputFile}")

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
