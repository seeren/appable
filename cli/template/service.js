module.exports = (className) => {

    return `import { Service } from 'babel-skeleton/service';

export const ${className} = new class extends Service {

    constructor() {
        super();
    }

}`;

}