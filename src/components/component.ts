import { ComponentInterface } from "./component.interface";

export abstract class Component implements ComponentInterface {

    private row: number = 0;

    public components: ComponentInterface[] = [];

    /**
     * @param selector 
     * @param template 
     * @param components 
     */
    constructor(
        public selector: string,
        public template: string = '',
        components: ComponentInterface[] = []) {
        this.selector = selector;
        this.template = template;
        components.forEach((component: ComponentInterface) => this.attach(component));
        window.document.createElement(this.selector);
    }

    /**
     * @param component 
     * @returns {ThisType}
     * 
     * @throws {ReferenceError} Component already attached
     */
    public attach(component: ComponentInterface): ComponentInterface {
        
        console.log(component);
            
        // console.log(this.components);
        const selector: string = component.selector.split('[')[0];
        if (-1 !== this.components.indexOf(component)) {
            throw new ReferenceError(`Can't attach "${selector}": is already attached`);
        }
        const attributeName: string = `data-${this.selector.split(' ').pop().split('[')[0]}`;
        const attribute: string = `${attributeName}="${this.row}"`;
        const match: RegExpExecArray = new RegExp(`<${selector}*(.(?!${attributeName}))+><`).exec(this.template);
        if (match) {
            const partialTag: string = match[0].substring(0, match[0].length - 2);
            this.template = this.template.replace(`${partialTag}>`, `${partialTag} ${attribute}>`);
        } else {
            // console.log(this);
            
            // console.log(this.components);
            
            (this as ComponentInterface).onInit && (this as ComponentInterface).onInit();
            // this.components.forEach((component: ComponentInterface) => component.onInit || component.onInit());
            this.template += `<${selector} ${attribute}></${selector}>`;
        }
        this.components.push(component);
        this.row += 1;
        component.selector = `${selector}[${attribute}]`;
        return this;
    }

    /**
     * @param component 
     * @returns {ThisType}
     * 
     * @throws {ReferenceError} Component not attached
     */
    public detach(component: ComponentInterface): ComponentInterface {
        const index: number = this.components.indexOf(component);
        const selectorSplitHook: string[] = component.selector.split('[');
        if (-1 === index || 1 === selectorSplitHook.length) {
            throw new ReferenceError(`Can't detach "${component.selector}": is not attached`);
        }
        const selectorSplitSpace: string[] = selectorSplitHook[selectorSplitHook.length - 2].split(' ');
        const selector: string = selectorSplitSpace[selectorSplitSpace.length - 1];
        const attributes: string = `${selectorSplitHook[selectorSplitHook.length - 1].replace(']', '')}`;
        const match: RegExpExecArray = new RegExp(`<${selector}+(.)+${attributes}+><`).exec(this.template);
        (this as ComponentInterface).onDestroy && (this as ComponentInterface).onDestroy();
        this.components.forEach((component: ComponentInterface) => component.onDestroy && component.onDestroy());
        this.template = this.template.replace(`${match[0]}/${selector}>`, '');
        this.components.splice(index, 1);
        this.row -= 1;
        component.selector = `${selector}`;
        return this;
    }

    /**
     * @returns {ThisType}
     */
    public update(): ComponentInterface {
        let vars = '';
        const element: HTMLElement = window.document.querySelector(this.selector);
        if (!element) {
            console.info(`No update for "${this.selector}": not found in the document`)
            return this;
        }
        const properties: string[] = window.Object.getOwnPropertyNames(this).slice(4).concat(
            window.Object.getOwnPropertyNames(this.constructor.prototype).slice(1),
        );
        ['onInit', 'onUpdate', 'onDestroy', 'onBack', 'onPause', 'onResume'].forEach((hookName: string) => {
            const index: number = properties.indexOf(hookName);
            if (-1 !== index) {
                properties.splice(index, 1);
            }
        });
        properties.forEach((varName: string) => {
            vars += `var ${varName} = this["${varName}"]`;
            if (this[varName as keyof Component] instanceof window.Function) {
                vars += '.bind(this)';
            }
            vars += ';';
        });
        element.innerHTML = eval(`${vars}\`${this.template}\``);
        this.updateEvents(element, properties);
        this.components.forEach((component: Component) => {
            if (-1 === component.selector.indexOf(this.selector)) {
                component.selector = `${this.selector} ${component.selector}`;
            }
            component.update();
        });
        (this as ComponentInterface).onUpdate && (this as ComponentInterface).onUpdate(element);
        return this;
    }

    /**
     * @param htmlElement 
     * @param properties 
     * @returns {ThisType}
     */
     protected updateEvents(
        htmlElement: HTMLElement,
        properties: string[]): ComponentInterface {
        let match: RegExpExecArray;
        properties.forEach((propertie) => {
            const regExp: RegExp = new window.RegExp(`(on[a-zA-Z]{4,16})="${propertie}\\((.*)\\)"`, 'g');
            const childEvent = (child: HTMLElement) => this.registerEvent(child, match[1], propertie, match[2].split(', '));
            do {
                match = regExp.exec(htmlElement.innerHTML);
                if (match) {
                    window.document.querySelectorAll(`${this.selector} [${match[0]}]`).forEach(childEvent);
                }
            } while (match);
        });
        return this;
    }

    /**
     * @param htmlElement 
     * @param type 
     * @param propertie 
     * @param args 
     * @returns {ThisType}
     */
     protected registerEvent(
        htmlElement: HTMLElement,
        type: string,
        propertie: string,
        args: string[]): ComponentInterface {
        htmlElement[type as keyof GlobalEventHandlers] = () => {
            const evaluedArguments: string[] = [];
            for (const key in args) {
                evaluedArguments[key] = eval(args[key]);
            }
            if ('undefined' !== typeof (this as any)[propertie](...evaluedArguments)) {
                this.update();
            }
        };
        return this;
    }

}
