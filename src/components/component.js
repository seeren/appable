import { ComponentOption } from "../models/component-option.model";

/**
 * @type {Component}
 */
export class Component {

    /**
     * @constructor
     * @param {ComponentOption} option
     */
    constructor(option) {

        /**
         * @type {Number}
         */
        this.row = 0;

        /**
         * @type {Component[]}
         */
        this.components = [];

        /**
         * @type {String}
         */
        this.selector = option.selector;

        /**
         * @type {String}
         */
        this.template = option.template;

        if (option.components) {
            option.components.forEach((component) => this.attach(component));
        }
        window.document.createElement(option.selector);
    }

    /**
     * @param {String} hookName 
     * @returns {Boolean}
     */
    lifeCycle(hookName) {
        let hookValue = null;
        if (this[hookName]) {
            hookValue = this[hookName]();
        }
        this.components.forEach((component) => {
            if (hookValue === false) {
                return component.lifeCycle(hookName);
            }
            hookValue = component.lifeCycle(hookName);
        });
        return hookValue;
    }

    /**
     * @param {Component|Function} component 
     * @returns {Component}
     * 
     * @throws {ReferenceError}
     */
    attach(component) {
        if (component instanceof window.Function) {
            component = new component;
        }
        const selector = component.selector.split("[")[0];
        if (-1 !== this.components.indexOf(component)) {
            throw new ReferenceError(`Can't attach "${selector}": instance already exist`);
        }
        const attributeName = `data-${this.selector.split("[")[0]}`;
        const attribute = `${attributeName}="${this.row}"`;
        const match = new RegExp(`<${selector}*(.(?!${attributeName}))+><`).exec(this.template);
        if (match) {
            const partialTag = match[0].substring(0, match[0].length - 2);
            this.template = this.template.replace(`${partialTag}>`, `${partialTag} ${attribute}>`);
        } else {
            this.template += `<${selector} ${attribute}></${selector}>`;
        }
        this.components.push(component);
        this.row++;
        component.selector = `${selector}[${attribute}]`;
        if (component.onInit) {
            component.onInit()
        }
        return this;
    }

    /**
     * @param {Component} component 
     * @returns {Component}
     * 
     * @throws {ReferenceError}
     */
    detach(component) {
        const index = this.components.indexOf(component);
        const selectorSplitHook = component.selector.split("[");
        if (-1 === index || 1 === selectorSplitHook.length) {
            throw new ReferenceError(`Can't detach "${component.selector}": make sure you attach it before`);
        }
        const selectorSplitSpace = selectorSplitHook[selectorSplitHook.length - 2].split(" ");
        const selector = selectorSplitSpace[selectorSplitSpace.length - 1];
        const attributes = `${selectorSplitHook[selectorSplitHook.length - 1].replace("]", "")}`;
        const match = new RegExp(`<${selector}+(.)+${attributes}+><`).exec(this.template);
        this.template = this.template.replace(`${match[0]}/${selector}>`, "");
        this.components.splice(index, 1);
        this.row--;
        component.selector = `${selector}`;
        if (component.onDestroy) {
            component.onDestroy()
        }
        return this;
    }

    /**
     * @param {HTMLElement} element Selected element
     * 
     * @throws {ReferenceError} for not found selector in the document
     */
    update() {
        let vars = "";
        const element = window.document.querySelector(this.selector);
        if (!element) {
            throw new ReferenceError(`Can't find "${this.selector}" selector in the document`)
        }
        const properties = window.Object.getOwnPropertyNames(this).slice(4).concat(
            window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1)
        );
        properties.forEach((varName) => {
            vars += `var ${varName} = this["${varName}"]`;
            if (this[varName] instanceof window.Function) {
                vars += ".bind(this)";
            }
            vars += ";";
        });
        element.innerHTML = eval(vars + '`' + this.template + '`');
        this.updateEvents(element, properties);
        this.components.forEach((component) => {
            if (-1 === component.selector.indexOf(this.selector)) {
                component.selector = `${this.selector} ${component.selector}`;
            }
            component.update();
        });
        if (this.onUpdate) {
            this.onUpdate(element)
        }
        return this;
    }

    /**
     * @param {HTMLElement} htmlElement 
     * @param {String[]} properties 
     * @returns {Component}
     */
    updateEvents(htmlElement, properties) {
        let match;
        properties.forEach((propertie) => {
            const regExp = new window.RegExp(`(on[a-zA-Z]{4,16})="${propertie}\\((\.*)\\)"`, "g");
            while (match = regExp.exec(htmlElement.innerHTML)) {
                window.document.querySelectorAll(`${this.selector} [${match[0]}]`).forEach(
                    (child) => this.registerEvent(child, match[1], propertie, match[2].split(", "))
                );
            }
        });
        return this;
    }

    /**
     * @param {HTMLElement} htmlElement 
     * @param {string} type 
     * @param {string} propertie 
     * @param {String[]} args 
     * @returns {Component}
     */
    registerEvent(htmlElement, type, propertie, args) {
        htmlElement[type] = () => {
            const evaluedArguments = [];
            for (const key in args) {
                evaluedArguments[key] = eval(args[key]);
            }
            if (undefined !== this[propertie](...evaluedArguments)) {
                this.update();
            }
        };
        return this;
    }

}
