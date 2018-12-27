module.exports = (className) => {

    return `import { Service } from 'babel-skeleton';

export const ${className}Service = new class extends Service {

    constructor() {
        super();
    }

}`;

}