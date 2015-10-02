(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = createPagination;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isNatural = __webpack_require__(1);

	var _isNatural2 = _interopRequireDefault(_isNatural);

	function createPagination(_ref) {
	  var itemsPerPage = _ref.itemsPerPage;
	  var maxPages = _ref.maxPages;

	  if (!(0, _isNatural2['default'])(itemsPerPage)) {
	    throw new Error('\'itemsPerPage\' must be a positive integer, not ' + itemsPerPage);
	    return;
	  }

	  if (!(0, _isNatural2['default'])(maxPages)) {
	    throw new Error('\'maxPages\' must be a positive integer, not ' + maxPages);
	    return;
	  }

	  var half = (maxPages - 1) / 2;
	  var smallerHalf = Math.floor(half);
	  var largerHalf = Math.ceil(half);

	  return function paginate(_ref2) {
	    var currentPage = _ref2.currentPage;
	    var totalItems = _ref2.totalItems;

	    if (!(0, _isNatural2['default'])(currentPage)) {
	      throw new Error('\'currentPage\' must be a positive integer, not ' + currentPage);
	      return;
	    }

	    if (!(0, _isNatural2['default'])(totalItems)) {
	      throw new Error('\'totalItems\' must be a positive integer, not ' + totalItems);
	      return;
	    }

	    var pagesCount = Math.ceil(totalItems / itemsPerPage);

	    if (currentPage > pagesCount) {
	      throw new Error('\'currentPage\' (' + currentPage + ') cannot be larger than pages count (' + pagesCount + ')');
	      return;
	    }

	    var minPage = undefined;

	    if (currentPage - smallerHalf <= 1) {
	      minPage = 1;
	    } else if (currentPage + largerHalf >= pagesCount) {
	      minPage = Math.max(1, pagesCount - maxPages + 1);
	    } else {
	      minPage = currentPage - smallerHalf;
	    }

	    var maxPage = Math.min(pagesCount, minPage + maxPages - 1);

	    var pages = [];

	    for (var page = minPage; page <= maxPage; page++) {
	      pages.push(page);
	    }

	    var showFirst = pages[0] > 1;
	    var showPrev = currentPage > 1;
	    var showNext = currentPage < pagesCount;
	    var showLast = pages[pages.length - 1] < pagesCount;
	    var lastPage = pagesCount;

	    return {
	      showFirst: showFirst,
	      showPrev: showPrev,
	      pages: pages,
	      showNext: showNext,
	      showLast: showLast,
	      lastPage: lastPage
	    };
	  };
	}

	;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	       value: true
	});
	exports['default'] = isNatural;

	function isNatural(something) {
	       return typeof something === 'number' && something % 1 === 0 && // not float
	       something > 0;
	}

	;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;