amqp                      = require 'amqplib'

username = 'guest'
password = 'guest'
server = "docker-rabbitmq-98153bfb.spyro.svc.tutum.io"
port = 49158

rabbitAMQP = {}

# amqp.connect("amqp://#{username}:#{password}@#{server}:#{port}")
# .then (conn) =>

#   # Crear Channel de comunicacion con amqp
#   rabbitAMQP.connection = conn
#   rabbitAMQP.connection.createChannel()
# .then (channel) =>
#   rabbitAMQP.channel = channel
# .catch (err) =>
#   console.log err

module.exports = rabbitAMQP