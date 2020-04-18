module.exports = (className) => `import { Service } from 'app-js';

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

}
`;