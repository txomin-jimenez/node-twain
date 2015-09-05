# Application routes.
module.exports = (match) ->
  match '', 'scan#index'

  match 'scan', 'scan#index'

  match 'setup', 'setup#show'
