/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/modal.js":
/*!************************************!*\
  !*** ./src/js/components/modal.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = /*#__PURE__*/function () {
  function Modal(container) {
    _classCallCheck(this, Modal);

    this.container = container;
    this.isOpen = false;
  }

  _createClass(Modal, [{
    key: "open",
    value: function open() {
      if (this.isOpen) return;
      this.container.classList.add('modal_active');
      this.isOpen = true;
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.isOpen) return;
      this.container.classList.remove('modal_active');
      this.isOpen = false;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (!this.isOpen) this.close();else this.open();
    }
  }]);

  return Modal;
}();



/***/ }),

/***/ "./src/js/components/modalFactory.js":
/*!*******************************************!*\
  !*** ./src/js/components/modalFactory.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return modalFactory; });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/components/modal.js");

function modalFactory(container, _ref) {
  var toOpen = _ref.toOpen,
      toClose = _ref.toClose,
      toToggle = _ref.toToggle;
  if (!container) return null;
  var modal = new _modal__WEBPACK_IMPORTED_MODULE_0__["default"](container);
  var groups = [toOpen, toClose, toToggle];
  var actions = [modal.open, modal.close, modal.toggle];
  groups.forEach(function (group, index) {
    if (!Array.isArray(group)) return;
    group.forEach(function (element) {
      element.addEventListener('click', function (event) {
        event.preventDefault();
        actions[index].call(modal);
      });
    });
  });
  window.addEventListener('click', function (event) {
    if (event.target === modal.container) modal.close();
  });
  return modal;
}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_modalFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/modalFactory */ "./src/js/components/modalFactory.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var initSearchBar = function initSearchBar() {
  var search = document.querySelector('#search');

  var cards = _toConsumableArray(document.querySelectorAll('.js-card'));

  if (!search || cards.length === 0) return;
  var titles = cards.map(function (card) {
    return card.querySelector('.js-card-title').textContent.trim().toLowerCase();
  });
  search.addEventListener('input', function (event) {
    cards.forEach(function (card, index) {
      var searchText = event.target.value.trim().toLowerCase();

      if (!titles[index].includes(searchText)) {
        card.classList.add('hidden');
      } else {
        card.classList.remove('hidden');
      }
    });
  });
};

initSearchBar();
Object(_components_modalFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(document.querySelector('.js-modal-article-create'), {
  toOpen: [document.querySelector('.js-modal-article-create-open')],
  toClose: [document.querySelector('.js-modal-article-create-close')]
});
Object(_components_modalFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(document.querySelector('.js-modal-user-auth'), {
  toOpen: [document.querySelector('.js-modal-user-auth-open')],
  toClose: [document.querySelector('.js-modal-user-auth-close')]
});

/***/ }),

/***/ "./src/sass/index.sass":
/*!*****************************!*\
  !*** ./src/sass/index.sass ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./src/js/index.js ./src/sass/index.sass ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/index.js */"./src/js/index.js");
module.exports = __webpack_require__(/*! ./src/sass/index.sass */"./src/sass/index.sass");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvbW9kYWxGYWN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9pbmRleC5zYXNzIl0sIm5hbWVzIjpbIk1vZGFsIiwiY29udGFpbmVyIiwiaXNPcGVuIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY2xvc2UiLCJvcGVuIiwibW9kYWxGYWN0b3J5IiwidG9PcGVuIiwidG9DbG9zZSIsInRvVG9nZ2xlIiwibW9kYWwiLCJncm91cHMiLCJhY3Rpb25zIiwidG9nZ2xlIiwiZm9yRWFjaCIsImdyb3VwIiwiaW5kZXgiLCJBcnJheSIsImlzQXJyYXkiLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjYWxsIiwid2luZG93IiwidGFyZ2V0IiwiaW5pdFNlYXJjaEJhciIsInNlYXJjaCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNhcmRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsInRpdGxlcyIsIm1hcCIsImNhcmQiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsInNlYXJjaFRleHQiLCJ2YWx1ZSIsImluY2x1ZGVzIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFr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QUFDcUIsUUFBUSxDQUFDQyxhQUFULENBQXVCLDBCQUF2QixDQUFELENBRFY7QUFFRXJCLFNBQU8sRUFBRSxDQUFDb0IsUUFBUSxDQUFDQyxhQUFULENBQXVCLDJCQUF2QixDQUFEO0FBRlgsQ0FGVSxDQUFaLEM7Ozs7Ozs7Ozs7O0FDckNBLHVDIiwiZmlsZSI6Im1haW4uYm91bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yIChjb250YWluZXIpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2VcbiAgfVxuXG4gIG9wZW4gKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbikgcmV0dXJuXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWxfYWN0aXZlJylcbiAgICB0aGlzLmlzT3BlbiA9IHRydWVcbiAgfVxuXG4gIGNsb3NlICgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSByZXR1cm5cbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbF9hY3RpdmUnKVxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2VcbiAgfVxuXG4gIHRvZ2dsZSAoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbikgdGhpcy5jbG9zZSgpXG4gICAgZWxzZSB0aGlzLm9wZW4oKVxuICB9XG59XG4iLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi9tb2RhbCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbW9kYWxGYWN0b3J5IChcbiAgY29udGFpbmVyLFxuICB7IHRvT3BlbiwgdG9DbG9zZSwgdG9Ub2dnbGUgfVxuKSB7XG4gIGlmICghY29udGFpbmVyKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKGNvbnRhaW5lcilcbiAgY29uc3QgZ3JvdXBzID0gW3RvT3BlbiwgdG9DbG9zZSwgdG9Ub2dnbGVdXG4gIGNvbnN0IGFjdGlvbnMgPSBbbW9kYWwub3BlbiwgbW9kYWwuY2xvc2UsIG1vZGFsLnRvZ2dsZV1cblxuICBncm91cHMuZm9yRWFjaCgoZ3JvdXAsIGluZGV4KSA9PiB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGdyb3VwKSkgcmV0dXJuXG4gICAgZ3JvdXAuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGFjdGlvbnNbaW5kZXhdLmNhbGwobW9kYWwpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gbW9kYWwuY29udGFpbmVyKSBtb2RhbC5jbG9zZSgpXG4gIH0pXG5cbiAgcmV0dXJuIG1vZGFsXG59XG4iLCJpbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbEZhY3RvcnknXG5cbmNvbnN0IGluaXRTZWFyY2hCYXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKVxuICBjb25zdCBjYXJkcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtY2FyZCcpXVxuICBpZiAoIXNlYXJjaCB8fCBjYXJkcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIGNvbnN0IHRpdGxlcyA9IGNhcmRzLm1hcCgoY2FyZCkgPT4ge1xuICAgIHJldHVybiBjYXJkXG4gICAgICAucXVlcnlTZWxlY3RvcignLmpzLWNhcmQtdGl0bGUnKVxuICAgICAgLnRleHRDb250ZW50XG4gICAgICAudHJpbSgpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICB9KVxuXG4gIHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgIGNhcmRzLmZvckVhY2goKGNhcmQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzZWFyY2hUZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoIXRpdGxlc1tpbmRleF0uaW5jbHVkZXMoc2VhcmNoVGV4dCkpIHtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmluaXRTZWFyY2hCYXIoKVxuXG5tb2RhbEZhY3RvcnkoXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tb2RhbC1hcnRpY2xlLWNyZWF0ZScpLFxuICB7XG4gICAgdG9PcGVuOiBbZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vZGFsLWFydGljbGUtY3JlYXRlLW9wZW4nKV0sXG4gICAgdG9DbG9zZTogW2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tb2RhbC1hcnRpY2xlLWNyZWF0ZS1jbG9zZScpXVxuICB9XG4pXG5cbm1vZGFsRmFjdG9yeShcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vZGFsLXVzZXItYXV0aCcpLFxuICB7XG4gICAgdG9PcGVuOiBbZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vZGFsLXVzZXItYXV0aC1vcGVuJyldLFxuICAgIHRvQ2xvc2U6IFtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbW9kYWwtdXNlci1hdXRoLWNsb3NlJyldXG4gIH1cbilcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=