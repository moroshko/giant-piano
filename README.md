[![giant-piano][giant-piano-gif]][demo-site]

[![Build Status][status-image]][status-url]
[![NPM Version][npm-image]][npm-url]

## Description

giant-piano is a small Javascript pagination utility. All it does is providing you the logic to render a pagination component in your app.

## Features

* [No dependencies][npm-url]
* [Thoroughly tested][tests-url]
* [Demo included][demo-site]

## Usage

```shell
npm install giant-piano --save
```

Then, in your app:

```js
var createPagination = require('giant-piano');

/* 
  `itemsPerPage` and `maxPages` are normally static,
  so you should call `createPagination` only once.
*/
var paginate = createPagination({ itemsPerPage: 10, maxPages: 5 });

/*
  Then, call `paginate` with the current page number 
  and the total amount of items.
*/
console.log(paginate({ currentPage: 5, totalItems: 63 }));
/* {
     showFirst: true,
     showPrev: true,
     pages: [3, 4, 5, 6, 7],
     showNext: true,
     showLast: false,
     lastPage: 7
   }
*/

console.log(paginate({ currentPage: 2, totalItems: 34 }));
/* {
     showFirst: false,
     showPrev: true,
     pages: [1, 2, 3, 4],
     showNext: true,
     showLast: false,
     lastPage: 4
   }
*/

console.log(paginate({ currentPage: 1, totalItems: 1234 }));
/* {
     showFirst: false,
     showPrev: false,
     pages: [1, 2, 3, 4, 5],
     showNext: true,
     showLast: true,
     lastPage: 124
   }
*/
```

## Run demo locally

```shell
npm start
```

## License

[MIT](http://moroshko.mit-license.org)

[giant-piano-gif]: https://github.com/moroshko/giant-piano/raw/master/giant-piano.gif
[tests-url]: https://github.com/moroshko/giant-piano/tree/master/tests
[demo-site]: http://giant-piano.js.org
[status-image]: https://img.shields.io/codeship/ed721580-4b10-0133-271b-7236a2d50232/master.svg
[status-url]: https://codeship.com/projects/106107
[npm-image]: https://img.shields.io/npm/v/giant-piano.svg
[npm-url]: https://npmjs.org/package/giant-piano
