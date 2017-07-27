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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _http = __webpack_require__(3);

var _http2 = _interopRequireDefault(_http);

var _path = __webpack_require__(0);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = __webpack_require__(5);

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _pathConfig = __webpack_require__(6);

var _pathConfig2 = _interopRequireDefault(_pathConfig);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(9);

var _compression2 = _interopRequireDefault(_compression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _compression2.default)());

var viewsDir = './templates';

var pathConfig = new _pathConfig2.default('/../../' + "dist");

// setup express to use handlebars as the templating engine
var hbs = _expressHandlebars2.default.create({
    defaultLayout: 'main',
    layoutsDir: _path2.default.join(__dirname, viewsDir + '/layouts'),
    partialsDir: _path2.default.join(__dirname, viewsDir + '/partials')
});
app.set('views', _path2.default.join(__dirname, '' + viewsDir));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// setup server for static assets
app.use('/', _express2.default.static('' + "dist", { maxAge: 604800000 }));

// Setup body parser for parsing POST request bodies
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var port = 3000 || 3000;

// POST route for form submission
app.post('/', function (req, res) {
    // validate the model
    if (req.body.email !== '') {
        res.redirect('/success');
    }
    res.redirect('/');
});

// setup server urls
app.get('/*', function (req, res) {
    // extract the path from the url
    var urlSections = req.path.split('/');
    urlSections = urlSections.filter(function (sectionString) {
        return sectionString.length > 0;
    });

    var urlPath = null;
    if (urlSections.length === 0) {
        if (urlSections[0] === '') {}
        urlPath = '/';
    } else {
        urlPath = '/' + urlSections.join('/');
    }

    // retrieve the path data
    var pathConfigData = pathConfig.getConfig(urlPath);
    if (!pathConfigData) {
        res.status(404).send();
        return;
    }

    // render the response
    res.render(pathConfigData.data.view, pathConfigData);
});

// only create two servers if running on localhost
_http2.default.createServer(app).listen(port, function () {
    return console.log('Running Example on localhost:' + port);
});

module.exports = app;
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(7);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(0);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(folder, pathConfigs) {
        _classCallCheck(this, _class);

        this.folder = folder;
        this.pathConfigs = {
            '/': {
                view: 'index',
                metaTitle: 'Webpack Example',
                title: 'Webpack Example',
                remoteStyles: ['/main.css'],
                remoteScripts: ['/main.js']
            },
            '/success': {
                view: 'empty',
                metaTitle: 'Success',
                title: 'Success',
                remoteStyles: ['/main.css'],
                remoteScripts: ['/main.js']
            }
        };
    }

    _createClass(_class, [{
        key: 'getFileContents',
        value: function getFileContents(files) {
            var self = this;
            // concat inline styles for document <head>
            var flattenedContents = '';
            files.forEach(function (file) {
                flattenedContents += _fs2.default.readFileSync(_path2.default.resolve(__dirname) + self.folder + file); // eslint-disable-line no-undef
            });

            return flattenedContents;
        }
    }, {
        key: 'getConfig',
        value: function getConfig(urlPath) {
            var object = this.pathConfigs[urlPath];

            // check if the path is actually valid.
            if (!object) {
                return null;
            }

            return {
                'data': object
            };
        }
    }]);

    return _class;
}();

exports.default = _class;
/* WEBPACK VAR INJECTION */}.call(exports, "server/models"))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjIzYjExOTdiNzk5ODg4MmM5NDQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy8uL2FwcC5iYWJlbC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3MtaGFuZGxlYmFyc1wiIiwid2VicGFjazovLy8uL3NlcnZlci9tb2RlbHMvcGF0aC1jb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbXByZXNzaW9uXCIiXSwibmFtZXMiOlsiYXBwIiwidXNlIiwidmlld3NEaXIiLCJwYXRoQ29uZmlnIiwiaGJzIiwiY3JlYXRlIiwiZGVmYXVsdExheW91dCIsImxheW91dHNEaXIiLCJqb2luIiwiX19kaXJuYW1lIiwicGFydGlhbHNEaXIiLCJzZXQiLCJlbmdpbmUiLCJzdGF0aWMiLCJtYXhBZ2UiLCJqc29uIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwicG9ydCIsInBvc3QiLCJyZXEiLCJyZXMiLCJib2R5IiwiZW1haWwiLCJyZWRpcmVjdCIsImdldCIsInVybFNlY3Rpb25zIiwicGF0aCIsInNwbGl0IiwiZmlsdGVyIiwic2VjdGlvblN0cmluZyIsImxlbmd0aCIsInVybFBhdGgiLCJwYXRoQ29uZmlnRGF0YSIsImdldENvbmZpZyIsInN0YXR1cyIsInNlbmQiLCJyZW5kZXIiLCJkYXRhIiwidmlldyIsImNyZWF0ZVNlcnZlciIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwiZm9sZGVyIiwicGF0aENvbmZpZ3MiLCJtZXRhVGl0bGUiLCJ0aXRsZSIsInJlbW90ZVN0eWxlcyIsInJlbW90ZVNjcmlwdHMiLCJmaWxlcyIsInNlbGYiLCJmbGF0dGVuZWRDb250ZW50cyIsImZvckVhY2giLCJmaWxlIiwicmVhZEZpbGVTeW5jIiwicmVzb2x2ZSIsIm9iamVjdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLGlDOzs7Ozs7Ozs7Ozs7OztpRENBQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsTUFBTSx3QkFBVjtBQUNBQSxJQUFJQyxHQUFKLENBQVEsNEJBQVI7O0FBRUEsSUFBSUMsV0FBVyxhQUFmOztBQUVBLElBQUlDLGFBQWEscUNBQXlCLE1BQXpCLENBQWpCOztBQUVBO0FBQ0EsSUFBSUMsTUFBTSw0QkFBT0MsTUFBUCxDQUFjO0FBQ3BCQyxtQkFBZSxNQURLO0FBRXBCQyxnQkFBWSxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBd0JQLFFBQXhCLGNBRlE7QUFHcEJRLGlCQUFhLGVBQUtGLElBQUwsQ0FBVUMsU0FBVixFQUF3QlAsUUFBeEI7QUFITyxDQUFkLENBQVY7QUFLQUYsSUFBSVcsR0FBSixDQUFRLE9BQVIsRUFBaUIsZUFBS0gsSUFBTCxDQUFVQyxTQUFWLE9BQXdCUCxRQUF4QixDQUFqQjtBQUNBRixJQUFJWSxNQUFKLENBQVcsWUFBWCxF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QWMsVUFBU0MsSUFBVCxFQUFlO0FBQ3pCRixxQ0FBcUIsYUFBR0csWUFBSCxDQUFnQixlQUFLQyxPQUFMLENBQWFqRCxTQUFiLElBQTBCNEMsS0FBS1AsTUFBL0IsR0FBd0NVLElBQXhELENBQXJCLENBRHlCLENBQzJEO0FBQ3ZGLGFBRkQ7O0FBSUEsbUJBQU9GLGlCQUFQO0FBQ0g7OztrQ0FFU3RCLE8sRUFBUztBQUNmLGdCQUFJMkIsU0FBUyxLQUFLWixXQUFMLENBQWlCZixPQUFqQixDQUFiOztBQUVBO0FBQ0EsZ0JBQUksQ0FBQzJCLE1BQUwsRUFBYTtBQUNULHVCQUFPLElBQVA7QUFDSDs7QUFFRCxtQkFBTztBQUNILHdCQUFRQTtBQURMLGFBQVA7QUFHSDs7Ozs7Ozs7Ozs7OztBQzlDTCwrQjs7Ozs7O0FDQUEsd0M7Ozs7OztBQ0FBLHdDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYyM2IxMTk3Yjc5OTg4ODJjOTQ0IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBleHBoYnMgZnJvbSAnZXhwcmVzcy1oYW5kbGViYXJzJztcbmltcG9ydCBQYXRoQ29uZmlnIGZyb20gJy4vc2VydmVyL21vZGVscy9wYXRoLWNvbmZpZyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAnY29tcHJlc3Npb24nO1xuXG5sZXQgYXBwID0gZXhwcmVzcygpO1xuYXBwLnVzZShjb21wcmVzc2lvbigpKTtcblxubGV0IHZpZXdzRGlyID0gJy4vdGVtcGxhdGVzJztcblxubGV0IHBhdGhDb25maWcgPSBuZXcgUGF0aENvbmZpZyhgLy4uLy4uLyR7cHJvY2Vzcy5lbnYub3V0cHV0Rm9sZGVyfWApO1xuXG4vLyBzZXR1cCBleHByZXNzIHRvIHVzZSBoYW5kbGViYXJzIGFzIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxubGV0IGhicyA9IGV4cGhicy5jcmVhdGUoe1xuICAgIGRlZmF1bHRMYXlvdXQ6ICdtYWluJyxcbiAgICBsYXlvdXRzRGlyOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBgJHt2aWV3c0Rpcn0vbGF5b3V0c2ApLFxuICAgIHBhcnRpYWxzRGlyOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBgJHt2aWV3c0Rpcn0vcGFydGlhbHNgKVxufSk7XG5hcHAuc2V0KCd2aWV3cycsIHBhdGguam9pbihfX2Rpcm5hbWUsIGAke3ZpZXdzRGlyfWApKTtcbmFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBoYnMuZW5naW5lKTtcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2hhbmRsZWJhcnMnKTtcblxuLy8gc2V0dXAgc2VydmVyIGZvciBzdGF0aWMgYXNzZXRzXG5hcHAudXNlKCcvJywgZXhwcmVzcy5zdGF0aWMoYCR7cHJvY2Vzcy5lbnYub3V0cHV0Rm9sZGVyfWAsIHsgbWF4QWdlOiA2MDQ4MDAwMDAgfSkpO1xuXG4vLyBTZXR1cCBib2R5IHBhcnNlciBmb3IgcGFyc2luZyBQT1NUIHJlcXVlc3QgYm9kaWVzXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuXG5sZXQgcG9ydCA9IHByb2Nlc3MuZW52LnBvcnQgfHwgMzAwMDtcblxuLy8gUE9TVCByb3V0ZSBmb3IgZm9ybSBzdWJtaXNzaW9uXG5hcHAucG9zdCgnLycsIChyZXEsIHJlcykgPT4ge1xuICAgIC8vIHZhbGlkYXRlIHRoZSBtb2RlbFxuICAgIGlmIChyZXEuYm9keS5lbWFpbCAhPT0gJycpIHtcbiAgICAgICAgcmVzLnJlZGlyZWN0KCcvc3VjY2VzcycpO1xuICAgIH1cbiAgICByZXMucmVkaXJlY3QoJy8nKTtcbn0pO1xuXG4vLyBzZXR1cCBzZXJ2ZXIgdXJsc1xuYXBwLmdldCgnLyonLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgIC8vIGV4dHJhY3QgdGhlIHBhdGggZnJvbSB0aGUgdXJsXG4gICAgbGV0IHVybFNlY3Rpb25zID0gcmVxLnBhdGguc3BsaXQoJy8nKTtcbiAgICB1cmxTZWN0aW9ucyA9IHVybFNlY3Rpb25zLmZpbHRlcigoc2VjdGlvblN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gc2VjdGlvblN0cmluZy5sZW5ndGggPiAwO1xuICAgIH0pO1xuXG4gICAgbGV0IHVybFBhdGggPSBudWxsO1xuICAgIGlmICh1cmxTZWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHVybFNlY3Rpb25zWzBdID09PSAnJykge31cbiAgICAgICAgdXJsUGF0aCA9ICcvJztcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cmxQYXRoID0gJy8nICsgdXJsU2VjdGlvbnMuam9pbignLycpO1xuICAgIH1cblxuICAgIC8vIHJldHJpZXZlIHRoZSBwYXRoIGRhdGFcbiAgICBsZXQgcGF0aENvbmZpZ0RhdGEgPSBwYXRoQ29uZmlnLmdldENvbmZpZyh1cmxQYXRoKTtcbiAgICBpZiAoIXBhdGhDb25maWdEYXRhKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyByZW5kZXIgdGhlIHJlc3BvbnNlXG4gICAgcmVzLnJlbmRlcihwYXRoQ29uZmlnRGF0YS5kYXRhLnZpZXcsIHBhdGhDb25maWdEYXRhKTtcbn0pO1xuXG4vLyBvbmx5IGNyZWF0ZSB0d28gc2VydmVycyBpZiBydW5uaW5nIG9uIGxvY2FsaG9zdFxuaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKS5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgIHJldHVybiBjb25zb2xlLmxvZyhgUnVubmluZyBFeGFtcGxlIG9uIGxvY2FsaG9zdDoke3BvcnR9YCk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcHA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAuYmFiZWwuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiaHR0cFwiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1oYW5kbGViYXJzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZXhwcmVzcy1oYW5kbGViYXJzXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoZm9sZGVyLCBwYXRoQ29uZmlncykge1xuICAgICAgICB0aGlzLmZvbGRlciA9IGZvbGRlcjtcbiAgICAgICAgdGhpcy5wYXRoQ29uZmlncyA9IHtcbiAgICAgICAgICAgICcvJzoge1xuICAgICAgICAgICAgICAgIHZpZXc6ICdpbmRleCcsXG4gICAgICAgICAgICAgICAgbWV0YVRpdGxlOiAnV2VicGFjayBFeGFtcGxlJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1dlYnBhY2sgRXhhbXBsZScsXG4gICAgICAgICAgICAgICAgcmVtb3RlU3R5bGVzOiBbJy9tYWluLmNzcyddLFxuICAgICAgICAgICAgICAgIHJlbW90ZVNjcmlwdHM6IFsnL21haW4uanMnXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICcvc3VjY2Vzcyc6IHtcbiAgICAgICAgICAgICAgICB2aWV3OiAnZW1wdHknLFxuICAgICAgICAgICAgICAgIG1ldGFUaXRsZTogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgcmVtb3RlU3R5bGVzOiBbJy9tYWluLmNzcyddLFxuICAgICAgICAgICAgICAgIHJlbW90ZVNjcmlwdHM6IFsnL21haW4uanMnXVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEZpbGVDb250ZW50cyhmaWxlcykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIGNvbmNhdCBpbmxpbmUgc3R5bGVzIGZvciBkb2N1bWVudCA8aGVhZD5cbiAgICAgICAgbGV0IGZsYXR0ZW5lZENvbnRlbnRzID0gJyc7XG4gICAgICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICAgICAgZmxhdHRlbmVkQ29udGVudHMgKz0gZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUpICsgc2VsZi5mb2xkZXIgKyBmaWxlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmxhdHRlbmVkQ29udGVudHM7XG4gICAgfVxuXG4gICAgZ2V0Q29uZmlnKHVybFBhdGgpIHtcbiAgICAgICAgbGV0IG9iamVjdCA9IHRoaXMucGF0aENvbmZpZ3NbdXJsUGF0aF07XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHBhdGggaXMgYWN0dWFsbHkgdmFsaWQuXG4gICAgICAgIGlmICghb2JqZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnZGF0YSc6IG9iamVjdFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZlci9tb2RlbHMvcGF0aC1jb25maWcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbXByZXNzaW9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29tcHJlc3Npb25cIlxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9