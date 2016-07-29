/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Pomegranate-rabbitmq
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 *
 * @module index
 */

"use strict";

var rabbit = require('rabbit.js');

exports.options = {
  url: 'amqp://localhost'
}

exports.metadata = {
  name: 'RabbitMQ',
  type: 'service',
  param: 'Rabbit'
}

exports.plugin = {
  load: function(inject, loaded) {
    var self = this
    var rmq = rabbit.createContext(this.options.url)
    this.rmq = rmq
    rmq.on('ready', function(){
      loaded(null, rmq)
    })

    rmq.on('error', function(err){
      self.lateError(err)
    })
  },
  start: function(done) {
    done()
  },
  stop: function(done) {
    if(!this.rmq) return done()

    this.rmq.on('close', function(){
      done()
    })
    this.rmq.close()
  }
}