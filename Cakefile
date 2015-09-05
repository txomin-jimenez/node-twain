{exec} = require 'child_process'
{spawn} = require 'child_process'
{fork} = require 'child_process'
os = require 'os'

if os.platform() is 'win32'
  coffee = 'coffee.cmd'
  brunch = 'brunch.cmd'
  nodemon = 'nodemon.cmd'
  nodemon = 'node.cmd'
else
  coffee = 'coffee'
  brunch = 'brunch'
  nodemon = 'nodemon'
  node = 'node'

task 'watch', 'Watches all brunches', ->
  brunch = spawn brunch, ['watch'], {stdio: 'inherit'}
  nodemon = spawn nodemon, [], {stdio: 'inherit'}

task 'server', 'Init app server', ->
  brunch = spawn brunch, ['build','--env', 'production'], {stdio: 'inherit'}
  node = spawn node, ['.'], {stdio: 'inherit'}