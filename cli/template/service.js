module.exports = (className) => `import { Service } from 'babel-skeleton';


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