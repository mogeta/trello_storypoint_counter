// export default (name) => 'Hello ' + name
// module.exports.add = function() {
//   console.log("My Name is jovi0608.");
// };

'use strict';

export default class {
    name:string;
    key:string;
    accessToken:string;

    constructor(key,token) {
        this.key = key;
        this.accessToken = token;
    }


    mergeStoryPoint(cards){
        var total = 0;
        var regexp = /\((.*)\)/;

        cards.forEach (function (row) {
            var matchResult =  row.name.match(regexp);
            if(matchResult!=null){
               total += parseFloat(matchResult[1]);
            }
        });
      return total;
    }

    getLists(boardID) {

        var response = UrlFetchApp.fetch(`https://api.trello.com/1/boards/${boardID}/lists?key=${this.key}&token=${this.accessToken}&fields=name`);
        return JSON.parse(response.getContentText());
    }

    //リスト内、カード配列取得
    getCards(list){
      var response = UrlFetchApp.fetch(`https://api.trello.com/1/lists/${list}/cards?key=${this.key}&token=${this.accessToken}`);
      return JSON.parse(response.getContentText());
    }


}
