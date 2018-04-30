/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Pomegranate-rabbitmq
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
var rabbit = require('amqplib')
/**
 *
 * @module pomegranate-rabbitmq
 */

exports.options = {
  url: 'amqp://localhost',
  socketOptions: {}
}

exports.metadata = {
  frameworkVersion: 6,
  name: 'RabbitMQ',
  type: 'service',
  param: 'RabbitConnection'
}

exports.plugin = {
  load: function(Options, PluginContext) {
    return rabbit.connect(Options.url)
      .then(function(connection){
        return connection
      })

  },
  start: function() {
  },
  stop: function(RabbitConnection, Logger) {
    if(RabbitConnection){
      return RabbitConnection.close()
        .then(function() {
          Logger.log('Connection closed.')
          return true
        })
    }

  }
}