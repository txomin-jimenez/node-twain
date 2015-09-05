# Application-specific utilities
# ------------------------------

# Delegate to Chaplin’s utils module.
utils = Chaplin.utils.beget Chaplin.utils

translate_ = (str,opts) ->
  i18n.t(str,opts)
####

capitalize_ = (str) ->
  str.charAt(0).toUpperCase() + str.slice(1)

pluralize_ = (str) ->
  translate_ str, context: "plural"

_.extend utils,
  onTypeFinished: (func) ->
    onKeyPress = ->
      clearTimeout T
      if S is 0
        S = new Date().getTime()
        D = 1000
        T = setTimeout(onTimeOut, 1000)
        return
      t = new Date().getTime()
      D = (D + (t - S)) / 2
      S = t
      T = setTimeout(onTimeOut, D * 2)
    onTimeOut = ->
      func.apply()
      S = 0
    T = `undefined`
    S = 0
    D = 1000
    $(this).bind("keydown", onKeyPress) #.bind "focusout", onTimeOut
    this

  naturalCmp: (str1, str2) ->
    if str1 == str2
      return 0
    if !str1
      return -1
    if !str2
      return 1
    cmpRegex = /(\.\d+)|(\d+)|(\D+)/g
    tokens1 = String(str1).match(cmpRegex)
    tokens2 = String(str2).match(cmpRegex)
    count = Math.min(tokens1.length, tokens2.length)
    i = 0
    while i < count
      a = tokens1[i]
      b = tokens2[i]
      if a != b
        num1 = +a
        num2 = +b
        if num1 == num1 and num2 == num2
          return if num1 > num2 then 1 else -1
        return if a < b then -1 else 1
      i++
    if tokens1.length != tokens2.length
      return tokens1.length - tokens2.length
    if str1 < str2 then -1 else 1


  i18n_: (op, str, options={}) ->

    # options = options?.hash

    t = op.indexOf("t")
    p = op.indexOf("p")
    c = op.indexOf("c")

    translation = translate_(str,options)

    if p > -1
      plural_ = pluralize_(str)
      if plural_?
        translation = plural_

    if c > -1
      translation = capitalize_(translation)

    translation



# Prevent creating new properties and stuff.
Object.seal? utils

window.trazautils = utils

module.exports = utils
