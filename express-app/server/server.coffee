require 'coffee-script/register'

express               = require 'express'
config                = require('../../brunch-config').config
path                  = require 'path'
cors                  = require 'cors'
bodyParser            = require 'body-parser'

devErrorHandler       = require './dev-error-handler'
errorHandler          = require './error-handler'
routeNotFound         = require './route-not-found'

appConfig             = require './config'

app = express()

app.use cors()

# all env
app.set "port", config.server.port
app.set "views", __dirname + "/../views"
app.set "view engine", "jade"
app.use express.logger("dev")
app.use express.cookieParser()
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.static(path.join(__dirname, "../../www"))
app.use app.router

app.use bodyParser.json()

# dev
if app.get("env") is "development"
  console.log "development"
  app.use express.errorHandler()

# prod
if app.get("env") is "production"
  console.log "production"

# # inicializar modulos

for moduleName in [
  'setup'
  'scan'
  'main'
]
  module_  = require "../modules/#{moduleName}"
  module_ app
####

# start server
app.listen app.get("port")

# catch 404 and forward to error handler
app.use routeNotFound
# development error handler
app.use devErrorHandler if app.get("env") is "development"
# production error handler
app.use errorHandler if app.get("env") is "production"

module.exports = app