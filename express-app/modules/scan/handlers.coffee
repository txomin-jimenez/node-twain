fileSystem = require('fs')
path    = require('path')
util              = require('util')

cmdTwainCmd = "C:\\CmdTwain\\CmdTwain.exe"
cmdTwainPreviewOpts = "/PAPER=A4 /RGB /DPI=30 /JPG25"
cmdTwainTmpDir = "C:\\temp"

module.exports =

  appEnv: 'development'

  preview: (req,res) ->
    
    if this.appEnv is 'production'
      tmpFileName = "preview_#{new Date().toISOString().replace('T', '_').replace(/[:,-]/g,'').substr(0, 15)}.jpg"
      tmpFilePath = path.join(cmdTwainTmpDir,tmpFileName)

      child_process = require('child_process')

      child_process.execSync("#{cmdTwainCmd} #{cmdTwainPreviewOpts} #{tmpFilePath}")

    else
      tmpFilePath = 'vendor/test_image.jpg'

    stat = fileSystem.statSync(tmpFilePath)

    res.writeHead 200,
        'Content-Type': 'image/jpg',
        'Content-Length': stat.size

    readStream = fileSystem.createReadStream(tmpFilePath)

    util.pump(readStream, res)

  scan: (req,res) ->

    options = req.query
    
    tmpFileName = "scan_#{new Date().toISOString().replace('T', '_').replace(/[:,-]/g,'').substr(0, 15)}.jpg"
    if this.appEnv is 'production'
      tmpFilePath = path.join(cmdTwainTmpDir,tmpFileName)

      child_process = require('child_process')

      child_process.execSync("#{cmdTwainCmd} #{tmpFilePath}")
    else
      tmpFilePath = 'vendor/test_image.jpg'

    stat = fileSystem.statSync(tmpFilePath)
    outputFileName = options.fileName or tmpFileName

    res.writeHead 200,
        'Content-Type': 'image/jpg',
        'Content-Length': stat.size
        'Content-Disposition': "attachment; filename=\"#{outputFileName}\";"

    readStream = fileSystem.createReadStream(tmpFilePath)

    util.pump(readStream, res)

