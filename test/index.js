'use strict'
const ObjectIterable = require('x-object-iterable')

const object = {
  data: 12,
  get accessor () {
    return Math.random()
  }
}

const clone = {}
const iterable = new ObjectIterable(object)

for (const element of iterable) {
  Object.defineProperty(clone, element.property, element.descriptor)
}

module.exports = {
  object: object,
  clone: clone,
  list: Array.from(iterable)
}
