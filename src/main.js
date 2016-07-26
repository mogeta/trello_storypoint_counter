var global = this;function util() {
}
function callGetCard() {
}(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Util = _interopRequire(require("./util.es6"));

var Trello = _interopRequire(require("./trello.es6"));

var global = undefined;
global.util = function () {
    var hoge = new Util("test");
    hoge.hello();
};

global.callGetCard = function () {
    var prop = PropertiesService.getScriptProperties().getProperties();
    var trello_key = prop.trello_key;
    var trello_access_token = prop.trello_access_token;
    var boardID = prop.trello_target_board_id;

    var trello = new Trello(trello_key, trello_access_token);

    //get each cards
    var boards = trello.getLists(boardID);
    boards.forEach(function (board) {
        var cards = trello.getCards(board.id);
        var points = trello.mergeStoryPoint(cards);
        Logger.log(points);
    });
};

},{"./trello.es6":2,"./util.es6":3}],2:[function(require,module,exports){
// export default (name) => 'Hello ' + name
// module.exports.add = function() {
//   console.log("My Name is jovi0608.");
// };

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _default = (function () {
    var _class = function _default(key, token) {
        _classCallCheck(this, _class);

        this.key = key;
        this.accessToken = token;
    };

    _createClass(_class, {
        mergeStoryPoint: {
            value: function mergeStoryPoint(cards) {
                var total = 0;
                var regexp = /\((.*)\)/;

                cards.forEach(function (row) {
                    var matchResult = row.name.match(regexp);
                    if (matchResult != null) {
                        total += parseFloat(matchResult[1]);
                    }
                });
                return total;
            }
        },
        getLists: {
            value: function getLists(boardID) {

                var response = UrlFetchApp.fetch("https://api.trello.com/1/boards/" + boardID + "/lists?key=" + this.key + "&token=" + this.accessToken + "&fields=name");
                return JSON.parse(response.getContentText());
            }
        },
        getCards: {

            //リスト内、カード配列取得

            value: function getCards(list) {
                var response = UrlFetchApp.fetch("https://api.trello.com/1/lists/" + list + "/cards?key=" + this.key + "&token=" + this.accessToken);
                return JSON.parse(response.getContentText());
            }
        }
    });

    return _class;
})();

module.exports = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _default = (function () {
    var _class = function _default(name) {
        _classCallCheck(this, _class);

        this.name = name;
    };

    _createClass(_class, {
        hello: {
            value: function hello() {
                Logger.log("My name is " + this.name);
            }
        }
    });

    return _class;
})();

module.exports = _default;

},{}]},{},[1]);
