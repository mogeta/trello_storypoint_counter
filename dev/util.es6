'use strict';

export default class {
    name:string;
    constructor(name) {
        this.name = name;
    }
    hello() {
        Logger.log('My name is ' + this.name);
    }
}
