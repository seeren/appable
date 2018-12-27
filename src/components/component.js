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

    /**
     * @param {string} hook 
     * @param {boolean} capture
     */
    lifeCycle(hook, capture) {
        if (this[hook]) {
            this[hook]()
        }
        if (capture) {
            this.components.forEach(
                component => component.lifeCycle(hook, capture)
            );
        }
    }

    /**
     * @param {Component} component
     * @param {bool} replace
     * @returns {this}
     */
    attach(component, replace) {
        this.detach(component);
        const attribute = `data-${this.selector.split("[")[0]}="${this.row}"`;
        const selector = component.selector.split("[")[0];
        const endTag = `</${selector}>`;
        const container = `<${selector} ${attribute}>${endTag}`;
        component.selector = `${selector}[${attribute}]`;
        this.components.push(component);
        this.row++;
        if (replace) {
            this.template = this.template.replace(`<${selector}>${endTag}`, container);
        } else {
            this.template += container;
        }
        if (component.onInit) {
            component.onInit()
        }
        return this;
    }

    /** 
     * @param {Component}
     * @returns {this}
     */
    detach(component) {
        const index = this.components.indexOf(component);
        if (index > -1) {
            const selectorSplit = component.selector.split("[");
            const selector = selectorSplit[0];
            const attributes = ` ${selectorSplit[1].replace("]", "")}`;
            this.lifeCycle("onDestroy", true);
            this.components.splice(index, 1);
            this.template = this.template.replace(`<${selector + attributes}></${selector}>`, "");
            this.row--;
            component.selector = `${selector}`;
        }
        return this;
    }

    /**
     * @returns {this}
     */
    update() {
        let vars = "";
        const htmlElement = window.document.querySelector(this.selector);
        const properties = window.Object.getOwnPropertyNames(this).slice(4).concat(
            window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1)
        );
        properties.forEach(varName => {
            vars += `var ${varName} = this["${varName}"]`;
            if (this[varName] instanceof window.Function) {
                vars += ".bind(this)";
            }
            vars += ";";
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
            const regExp = new window.RegExp(
                `(on[a-zA-Z]{4,16})="${propertie}\\((\.*)\\)"`, "g"
            );
            while (match = regExp.exec(htmlElement.innerHTML)) {
                window.document.querySelectorAll(
                    `${this.selector} [${match[0]}]`
                ).forEach(
                    child => this.registerEvent(
                        child, match[1], propertie, match[2].split(", ")
                    )
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
            const evaluedArguments = [];
            for (let key in args) {
                evaluedArguments[key] = eval(args[key]);
            }
            if (undefined !== this[propertie](...evaluedArguments)) {
                this.update();
            }
        };
    }

}