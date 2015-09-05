# Application-specific view helpers
# http://handlebarsjs.com/#helpers
# --------------------------------
utils = require './utils'

register = (name, fn) ->
  Handlebars.registerHelper name, fn

# Map helpers
# -----------

# Make 'with' behave a little more mustachey.
register 'with', (context, options) ->
  if not context or Handlebars.Utils.isEmpty context
    options.inverse(this)
  else
    options.fn(context)

# Inverse for 'with'.
register 'without', (context, options) ->
  inverse = options.inverse
  options.inverse = options.fn
  options.fn = inverse
  Handlebars.helpers.with.call(this, context, options)

# Get Chaplin-declared named routes. {{url "likes#show" "105"}}
register 'url', (routeName, params..., options) ->
  utils.reverse routeName, params

register 'capitalize', (str, params..., options) ->
  str = str.toLowerCase().replace(/\b[a-z]/g, (letter) ->
    return letter.toUpperCase()
  )
  return str

####


register "i18n_", (op, str, options) ->
  utils.i18n_(op,str,options)
####

register "numeral_", (number, format, options) ->
  numeral(number).format(format)
####





