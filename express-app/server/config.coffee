nconf                 = require 'nconf'
setupFile             = './node-twain.json'

module.exports = nconf.env().file setupFile
