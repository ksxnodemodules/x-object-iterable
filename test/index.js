
((module) => {
  'use strict'

  var ObjectIterable = require('x-object-iterable')

  var object = {
    data: 12,
    get accessor () {
      return Math.random()
    }
  }

  var clone = {}

  var iterable = new ObjectIterable(object)

  for (let element of iterable) {
    Object.defineProperty(clone, element.property, element.descriptor)
  }

  module.exports = {
    object: object,
    clone: clone,
    list: iterable.toArray()
  }
})(module)
