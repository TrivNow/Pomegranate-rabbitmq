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
  name: 'RabbitMQ',
  type: 'service',
  param: 'RabbitConnection'
}

exports.plugin = {
  load: function(inject, loaded) {
    var self = this
    rabbit.connect(this.options.url)
      .then(function(connection){
        self.connection = connection
        loaded(null, connection)
      })
      .catch(function(err) {
        loaded(err)
      })

  },
  start: function(done) {
    done()
  },
  stop: function(done) {
    if(this.connection){
      this.connection.close()
        .then(function() {
          done()
        })
        .catch(function(err) {
          done(err)
        })
    }

  }
}