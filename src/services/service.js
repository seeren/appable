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
         * Attach a callable triggered when notify is called
         * 
         * @example
         * const callable = (s) => console.log(s)
         * service.attach(callable)
         * 
         * @param {Function} callable
         * @returns {Service}
         */
        this.attach = (callable) => {
            callables.push(callable);
            return this;
        };

        /**
         * Detach a callable
         * 
         * @example
         * service.detach(callable)
         * 
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
         * Call all attached callables
         * 
         * @example
         * service.notify()
         * 
         * @returns {Service}
         */
        this.notify = () => {
            callables.forEach(callable => callable(this));
            return this;
        };

    }

}
