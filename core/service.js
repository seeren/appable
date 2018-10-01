/**
 * @type {Service}
 */
export class Service {

    /**
     * @constructor
     */
    constructor() {

        /**
         * @type {Array}
         */
        let callback = [];

        /**
         * @param {Function} callable
         */
        this.attach = callable => callback.push(callable);

        /**
         * @param {Function} callable 
         */
        this.detach = (callable) => {
            for (let key in callback) {
                if (callable === callback[key]) {
                    callback.splice(key, 1);
                    break;
                }
            }
        }

        /**
         * @returns {void}
         */
        this.notify = () => {
            for (
                let i = 0, l = callback.length;
                i < l;
                callback[i](this), i++
            );
        };

    }

}