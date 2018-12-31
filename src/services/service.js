/**
 * @type {Service}
 */
export class Service {

    /**
     * @constructor
     */
    constructor() {

        /**
         * @type {Function[]}
         */
        const callback = [];

        /**
         * @param {Function} callable
         * @returns {this}
         */
        this.attach = (callable) => {
            callback.push(callable);
            return this;
        };

        /**
         * @returns {this}
         */
        this.notify = () => {
            callback.forEach(callable => callable(this));
            return this;
        };

        /**
         * @param {Function} callable 
         * @returns {this}
         */
        this.detach = (callable) => {
            const index = callback.indexOf(callable);
            if (index < 0) {
                callback.splice(key, 1);
            }
            return this;
        };

    }

}
