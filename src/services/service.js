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
        const callables = [];

        /**
         * @param {Function} callable
         * @returns {Service}
         */
        this.attach = (callable) => {
            callables.push(callable);
            return this;
        };

        /**
         * @param {Function} callable
         * @returns {Service}
         */
        this.detach = (callable) => {
            const index = callables.indexOf(callable);
            if (-1 !== index) {
                callables.splice(index, 1);
            }
            return this;
        };

        /**
         * @returns {Service}
         */
        this.notify = () => {
            callables.forEach(callable => callable(this));
            return this;
        };

    }

}
