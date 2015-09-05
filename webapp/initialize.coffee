Application = require 'application'
routes = require 'routes'
Utils = require 'lib/utils'
# Initialize the application on DOM ready event.
$ ->

  $.fn.onTypeFinished = Utils.onTypeFinished

  FastClick.attach(document.body)

  i18n.init
    lng: 'en'
    fallbackLng: 'en'
    ns:
      namespaces: [
        'app'
      ]
      defaultNs: 'app'
  , ->

    numeral.language('en')

    new Application {
      title: 'Web Scanner',
      controllerSuffix: '-controller',
      routes
    }
