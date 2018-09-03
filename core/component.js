/**
 * @type {Component}
 */
export class Component {

    /**
     * @constructor
     * @param {Object} options
     */
    constructor(options) {
        this.row = 0;
        this.models = [];
        this.components = [];
        this.selector = options.selector;
        this.template = options.template;
        if (options.components) {
            options.components.forEach(component => this.attach(component, true));
        }
        window.document.createElement(options.selector);
    }

    /**
     * @param {Component}
     * @returns {this}
     */
    attach(component, replace) {
        let endTag = `</${component.selector}>`;
        let attribute = `data-${this.selector}="${this.row}"`;
        let container = `<${component.selector} ${attribute}>${endTag}`;
        if (replace) {
            this.template = this.template.replace(`<${component.selector}>${endTag}`, container);
        } else {
            this.template += container;
        }
        this.components.push(component);
        this.row++;
        component.selector = `${component.selector}[${attribute}]`;
        return this;
    }

    /** 
     * @param {Component}
     * @returns {this}
     */
    detach(component) {
        let index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
            let selectorSplit = component.selector.split(`[`);
            let selector = selectorSplit[0];
            let attributes = ` ${selectorSplit[1].replace(`]`, ``)}`;
            this.template = this.template.replace(`<${selector + attributes}></${selector}>`, ``);
        }
        return this;
    }

    /**
     * @returns {HTMLElement}
     */
    update() {
        let vars = ``;
        let methodsName = window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1);
        let htmlElement = window.document.querySelector(this.selector);
        window.Object.getOwnPropertyNames(this).slice(5).concat(methodsName).forEach(
            varName => {
                vars += `var ${varName} = this["${varName}"]`;
                if (this[varName] instanceof window.Function) {
                    vars += `.bind(this)`;
                }
                vars += `;`;
            }
        );
        htmlElement.innerHTML = eval(vars + '`' + this.template + '`');
        this.components.forEach(component => component.update());
        this.updateEvents(htmlElement, methodsName);
        return htmlElement;
    }

    updateEvents(htmlElement, methodsName) {
        methodsName.forEach(
            methodName => {
                let match;
                let regExp = new window.RegExp(`(on[a-zA-Z]{4,16})="${methodName}\\((\.*)\\)"`, 'g');
                while (match = regExp.exec(htmlElement.innerHTML)) {
                    window.document.querySelectorAll(`${this.selector} [${match[0]}]`).forEach(
                        child => this.registerEvent(child, match[1], methodName, match[2].split(", "))
                    );
                }
            }
        );
    }

    registerEvent(htmlElement, type, methodName, args) {
        htmlElement[type] = () => {
            if(undefined !== this.toogle(eval(args.toString()))) {
                this.update();
            }
        };
    }

}