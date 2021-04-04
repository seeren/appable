/**
 * @param {String} className
 */
module.exports = (className) => `import { Service } from 'appable';

/**
 * @type {${ className }Service}
 */
export const ${ className }Service = new class ${ className }Service extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

}();
`;
