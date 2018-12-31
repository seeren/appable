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
        const callback = [];

        /**
         * @param {Function} callable
         */
        this.attach = (callable) => callback.push(callable);

        /**
         * @returns {void}
         */
        this.notify = () => callback.forEach(callable => callable(this));

        /**
         * @param {Function} callable 
         */
        this.detach = (callable) => {
            const index = callback.indexOf(callable);
            if (index < 0) {
                callback.splice(key, 1);
            }
        };

    }

}
