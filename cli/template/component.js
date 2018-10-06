module.exports = (filename, className) => {

    return `import { Component } from 'babel-skeleton/component';
import { template } from './${filename}.component.html';
    
export class ${className} extends Component {

    constructor() {
        super({
            selector: \`${filename}\`,
            template: template
        });
    }

}`;

};