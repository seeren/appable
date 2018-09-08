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
     * @param {Component} component
     * @param {bool} reset
     * @returns {this}
     */
    attach(component, replace) {
        this.detach(component);
        let attribute = `data-${this.selector}="${this.row}"`;
        let selector = component.selector.split(`[`)[0];
        let endTag = `</${selector}>`;
        let container = `<${selector} ${attribute}>${endTag}`;
        this.components.push(component);
        this.row++;
        if (replace) {
            this.template = this.template.replace(`<${selector}>${endTag}`, container);
        } else {
            this.template += container;
        }
        component.selector = `${selector}[${attribute}]`;
        return this;
    }

    /** 
     * @param {Component}
     * @returns {this}
     */
    detach(component) {
        let index = this.components.indexOf(component);
        if (index > -1) {
            let selectorSplit = component.selector.split(`[`);
            let selector = selectorSplit[0];
            let attributes = ` ${selectorSplit[1].replace(`]`, ``)}`;
            this.components.splice(index, 1);
            this.template = this.template.replace(`<${selector + attributes}></${selector}>`, ``);
        }
        return this;
    }

    /**
     * @returns {void}
     */
    clear() {
        this.components.forEach(component => this.detach(component));
    }

    /**
     * @returns {HTMLElement}
     */
    update() {
        let vars = ``;
        let methods = window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1);
        let htmlElement = window.document.querySelector(this.selector);
        window.Object.getOwnPropertyNames(this).slice(5).concat(methods).forEach(
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
        this.updateEvents(htmlElement, methods);
        return htmlElement;
    }

    /**
     * @param {HTMLElement} htmlElement 
     * @param {Array} methods 
     */
    updateEvents(htmlElement, methods) {
        let match;
        methods.forEach(
            method => {
                let regExp = new window.RegExp(`(on[a-zA-Z]{4,16})="${method}\\((\.*)\\)"`, 'g');
                while (match = regExp.exec(htmlElement.innerHTML)) {
                    window.document.querySelectorAll(`${this.selector} [${match[0]}]`).forEach(
                        child => this.registerEvent(child, match[1], method, match[2].split(", "))
                    );
                }
            }
        );
    }

    /**
     * @param {HTMLElement} htmlElement 
     * @param {string} type 
     * @param {string} method 
     * @param {Array} args 
     */
    registerEvent(htmlElement, type, method, args) {
        htmlElement[type] = () => {
            if (undefined !== this[method](eval(args.toString()))) {
                this.update();
            }
        };
    }

}