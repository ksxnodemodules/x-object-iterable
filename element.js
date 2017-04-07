'use strict'

class Element extends Array {
  get object () {
    return this[0]
  }

  get property () {
    return this[1]
  }

  get descriptor () {
    return Object.getOwnPropertyDescriptor(this.object, this.property)
  }

  get value () {
    return this.object[this.property]
  }

  set value (value) {
    this.object[this.property] = value
  }

  valueOf () {
    return this.value
  }
}

module.exports = class extends Element {}
