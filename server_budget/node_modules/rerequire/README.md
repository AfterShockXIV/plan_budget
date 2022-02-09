# Rerequire

Dependency injection for Node.js modules. This module works the same as require but you can mock modules and globals.

```js
var rerequire = require('rerequire');

rerequire(/* file to module you want to test */, /* module mocks */, /* global mocks */);
```

## Example

```js
var test_file = rerequire('./test_files', {
  'http': 'http mock', // Mock global module
  './mod': 'mock mod', // Mock local module
}, {
  'Date': 'mock date', // Mock gloval
});
```
