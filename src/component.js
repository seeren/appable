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
        this.components = [];
        this.selector = options.selector;
        this.template = options.template;
        if (options.components) {
            options.components.forEach(component => this.attach(component, true));
        }
        window.document.createElement(options.selector);
    }

    lifeCycle(hook) {
        if (this[hook]) {
            this[hook]()
        }
        this.components.forEach(component => component.lifeCycle(hook));
    }

    /**
     * @param {Component} component
     * @param {bool} reset
     * @returns {this}
     */
    attach(component, replace) {
        this.detach(component);
        let attribute = `data-${this.selector.split(`[`)[0]}="${this.row}"`;
        let selector = component.selector.split(`[`)[0];
        let endTag = `</${selector}>`;
        let container = `<${selector} ${attribute}>${endTag}`;
        component.selector = `${selector}[${attribute}]`;
        this.components.push(component);
        this.row++;
        if (replace) {
            this.template = this.template.replace(`<${selector}>${endTag}`, container);
        } else {
            this.template += container;
            this.lifeCycle("onInit");
        }
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
            this.lifeCycle("onDestroy");
            this.components.splice(index, 1);
            this.template = this.template.replace(`<${selector + attributes}></${selector}>`, ``);
            this.row--;
            component.selector = `${selector}`;
        }
        return this;
    }

    /**
     * @returns {this}
     */
    update() {
        let vars = ``;
        let htmlElement = window.document.querySelector(this.selector);
        let properties = window.Object.getOwnPropertyNames(this).slice(4).concat(
            window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1)
        );
        properties.forEach(varName => {
            vars += `var ${varName} = this["${varName}"]`;
            if (this[varName] instanceof window.Function) {
                vars += `.bind(this)`;
            }
            vars += `;`;
        });
        htmlElement.innerHTML = eval(vars + '`' + this.template + '`');
        this.updateEvents(htmlElement, properties);
        this.components.forEach(component => component.update(component));
        if (this.onUpdate) {
            this.onUpdate(htmlElement)
        }
        return this;
    }

    /**
     * @param {HTMLElement} htmlElement 
     * @param {Array} properties 
     */
    updateEvents(htmlElement, properties) {
        let match;
        properties.forEach(propertie => {
            let regExp = new window.RegExp(`(on[a-zA-Z]{4,16})="${propertie}\\((\.*)\\)"`, 'g');
            while (match = regExp.exec(htmlElement.innerHTML)) {
                window.document.querySelectorAll(`${this.selector} [${match[0]}]`).forEach(
                    child => this.registerEvent(child, match[1], propertie, match[2].split(", "))
                );
            }
        });
    }

    /**
     * @param {HTMLElement} htmlElement 
     * @param {string} type 
     * @param {string} propertie 
     * @param {Array} args 
     */
    registerEvent(htmlElement, type, propertie, args) {
        htmlElement[type] = () => {
            if (undefined !== this[propertie](eval(args.toString()))) {
                this.update();
            }
        };
    }

}