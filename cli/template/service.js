module.exports = (className) => `import { Service } from 'appable';

/**
 * @type {${className}Service}
 */
export const ${className}Service = new class extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
    }

}();

`;
