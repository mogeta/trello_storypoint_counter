import Util from './util.es6';
import Trello from './trello.es6'

global.util = function () {
    var hoge = new Util("test");
    hoge.hello();
}

global.callGetCard = function () {
    var prop = PropertiesService.getScriptProperties().getProperties();
    let trello_key          = prop.trello_key;
    let trello_access_token = prop.trello_access_token;
    let boardID             = prop.trello_target_board_id
    let slackChannelID      = prop.slack_target_channel_id;

    let trello = new Trello(trello_key, trello_access_token);

    //get each cards
    let boards = trello.getLists(boardID);
    var talk = "現在のプロジェクトステータスです\n";


    boards.forEach(function (board) {
        var cards = trello.getCards(board.id);
        var points = trello.mergeStoryPoint(cards);
        talk += board.name+"のストーリーポイントは"+points+"です。\n";
    });

    postMessage(slackChannelID,talk);
}


global.postMessage = function(channelID,comment) {
  var prop = PropertiesService.getScriptProperties().getProperties();

  var slackApp = SlackApp.create(prop.slack_token);
  
  slackApp.postMessage(channelID, comment, {
    username : "gas manager",
    icon_emoji : ":+1:"
  });
}