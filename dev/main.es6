import Util from './util.es6';
import Trello from './trello.es6'

var global = this;
global.util = function () {
    var hoge = new Util("test");
    hoge.hello();
}

global.callGetCard = function () {
    var prop = PropertiesService.getScriptProperties().getProperties();
    let trello_key = prop.trello_key;
    let trello_access_token = prop.trello_access_token;
    let boardID = prop.trello_target_board_id

    let trello = new Trello(trello_key, trello_access_token);

    //get each cards
    let boards = trello.getLists(boardID);
    boards.forEach(function (board) {
        var cards = trello.getCards(board.id);
        var points = trello.mergeStoryPoint(cards);
        Logger.log(points);
    });
}
