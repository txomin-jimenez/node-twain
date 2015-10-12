

module.exports =

  preview: ->

    deferred = Q.defer()

    xhr = new XMLHttpRequest()

    xhr.onreadystatechange = ->
      if this.readyState is 4
        if this.status == 200
          url = window.URL or window.webkitURL;
          imageUrl = url.createObjectURL(this.response);

          deferred.resolve(imageUrl)
        else
          deferred.reject(this.statusText)
    ####

    xhr.open 'GET', "/api/preview"
    xhr.responseType = 'blob'
    xhr.send()

    deferred.promise

  scan: (options) ->

    window.location.assign "/api/scan"