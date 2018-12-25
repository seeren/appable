module.exports = (filename, className) => `import { Component } from "babel-skeleton/component";
import { template } from "./${filename}.component.html";
    
export class ${className}Component extends Component {

    constructor() {
        super({
            selector: \`${filename}\`,
            template: template
        });
    }

}`;