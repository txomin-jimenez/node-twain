cmwTwainCmd = "C:\\CmTwain\\CmdTwain.exe"

module.exports =

  scan: (outputFile)->

    child_process = require('child_process')

    child_process.execSync("#{cmwTwainCmd} #{outputFile}")
