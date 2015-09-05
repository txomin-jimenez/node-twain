exports.config =
  # See https://github.com/brunch/brunch/blob/master/docs/config.md for documentation.
  paths:
    public: 'www'
    watched: ['webapp','vendor']
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^webapp/
        'javascripts/vendor.js': /^(vendor|bower_components)/
      order:
        before: []

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(webapp|vendor|bower_components)/
      order:
        before: []
        after: []

    templates:
      joinTo: 'javascripts/app.js'

  conventions:
    assets: /(assets|vendor\/assets|font|fonts)/

  modules:
    nameCleaner: (path) ->
      path.replace /^webapp\//, ''

  server:
    port: 4444
    # path: 'express-app/server/start-server.coffee'

  plugins:
    autoReload:
      enabled: true

  overrides:
    production:
      plugins:
        autoReload:
          enabled: false
