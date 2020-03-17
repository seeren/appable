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
     * @param {Component} component 
     * @returns {Component}
     * 
     * @throws {ReferenceError}
     */
    attach(component) {
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
        const selectorSplit = component.selector.split("[");
        const selector = selectorSplit[0];
        if (-1 === index || 1 === selectorSplit.length) {
            throw new ReferenceError(`Can't detach "${selector}": make sure you attach it before`);
        }
        const attributes = `${selectorSplit[1].replace("]", "")}`;
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
     * @returns {Component}
     * 
     * @throws {ReferenceError}
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
        this.updateEvents(element, properties).updateComponents();
        if (this.onUpdate) {
            this.onUpdate(element)
        }
        return this;
    }

    /**
     * @returns {Component}
     */
    updateComponents() {
        this.components.forEach((component) => {
            if (-1 === component.selector.indexOf(this.selector)) {
                component.selector = `${this.selector} ${component.selector}`;
            }
            component.update();
        });
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
