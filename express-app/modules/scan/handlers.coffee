fileSystem = require('fs')
path    = require('path')
util              = require('util')

cmdTwainCmd = "C:\\CmdTwain\\CmdTwain.exe"
cmdTwainPreviewOpts = "/PAPER=A4 /RGB /DPI=30 /JPG25"
cmdTwainTmpDir = "C:\\temp"

module.exports =

  # index: (req, res) ->

  #   soup = new TablesSoup

  #   soup.list()
  #   .then (tables) ->
  #     res.send tables

  preview: (req,res) ->

    tmpFileName = "preview_#{new Date().toISOString().replace('T', '_').replace(/[:,-]/g,'').substr(0, 15)}.jpg"
    tmpFilePath = path.join(cmdTwainTmpDir,tmpFileName)

    child_process = require('child_process')

    child_process.execSync("#{cmdTwainCmd} #{cmdTwainPreviewOpts} #{tmpFilePath}")

    stat = fileSystem.statSync(tmpFilePath);

    res.writeHead 200,
        'Content-Type': 'image/jpg',
        'Content-Length': stat.size

    readStream = fileSystem.createReadStream(tmpFilePath);

    util.pump(readStream, res);

  scan: (req,res) ->

    ###
    outputFile = "Z:\\scanner\\scan_#{new Date().toISOString().replace('T', '_').replace(/[:,-]/g,'').substr(0, 15)}.jpg"

    child_process = require('child_process')

    child_process.execSync("#{cmdTwainCmd} #{outputFile}")

    res.json {ok: true}
    ###

    options = req.body

    tmpFileName = "scan_#{new Date().toISOString().replace('T', '_').replace(/[:,-]/g,'').substr(0, 15)}.jpg"
    tmpFilePath = path.join(cmdTwainTmpDir,tmpFileName)

    child_process = require('child_process')

    child_process.execSync("#{cmdTwainCmd} #{tmpFilePath}")

    stat = fileSystem.statSync(tmpFilePath);
    outputFileName = options.fileName or tmpFileName

    res.writeHead 200,
        'Content-Type': 'image/jpg',
        'Content-Length': stat.size
        'Content-Disposition': "attachment; filename=\"#{outputFileName}\";"

    readStream = fileSystem.createReadStream(tmpFilePath);

    util.pump(readStream, res);

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
