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
         * @param {Function} callback
         */
        this.attach = callable => callback.push(callable);

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