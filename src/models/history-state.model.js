/**
 * @type {HistoryState}
 */
export class HistoryState {

    /**
     * @constructor
     * 
     * @param {String} path 
     * @param {Object} name 
     */
    constructor(name, param) {

        /**
         * @param {String} path 
         */
        this.name = name;

        /**
         * @param {Object} path 
         */
        this.param = param || {};
    }

}
