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
         * @returns {void}
         */
        this.notify = () => callback.forEach(callable => callable(this));

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
        };

    }

}