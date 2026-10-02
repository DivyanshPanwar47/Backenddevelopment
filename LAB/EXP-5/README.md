# Experiment 5: JavaScript Arrays, Objects and Functions

This experiment demonstrates JavaScript arrays, objects, functions and common manipulation methods. It also implements the library PBL activity with `addBook(title, author)` and `findBook(title)`.

## Run in a browser

Open `index.html` in a browser and open the developer console. The library result is also rendered on the page.

## Run with Node.js

```bash
node script.js
node script2.js
```

`script.js` exports the library functions when loaded by Node.js, so it can also be reused from another script:

```js
const { addBook, findBook } = require('./script');
addBook('JavaScript: The Good Parts', 'Douglas Crockford');
console.log(findBook('JavaScript: The Good Parts'));
```
