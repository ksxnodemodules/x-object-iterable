
# x-object-iterable

## Requirements

 * Node >= 6.0.0

## Examples

### Shallow cloning an object

```javascript
var ObjectIterable = require('x-object-iterable');
var object = {
  data: 12,
  get accessor() {
    return Math.random();
  }
};
var clone = {};
var iterable = new ObjectIterable(object);
for (let element of iterable) {
  Object.defineProperty(clone, element.property, element.descriptor);
}
console.log(clone);
```
