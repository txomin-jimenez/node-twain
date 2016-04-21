

module.exports =
    
  ###*
    Request scan preview 
  @method preview
  ###
  preview: ->

    deferred = Q.defer()

    xhr = new XMLHttpRequest()

    xhr.onreadystatechange = ->
      if this.readyState is 4
        if this.status >= 200 and this.status < 300
          url = window.URL or window.webkitURL
          imageUrl = url.createObjectURL(this.response)

          deferred.resolve(imageUrl)
        else
          deferred.reject(this.statusText)
    ####

    xhr.open 'GET', "/api/preview"
    xhr.responseType = 'blob'
    xhr.send()

    deferred.promise

  ###*
    Request scan and send image download
  @method scan
  ###
  scan: (options={}) ->

    if options.fileName?
      window.location.assign "/api/scan?fileName=#{options.fileName}"
    else
      window.location.assign "/api/scan"
    Q()
