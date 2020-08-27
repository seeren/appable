export class Component {

    row: number;

    selector: string;

    template: string;

    components: [];

    /**
     * @param option 
     */
    constructor(option: {
        selector: string,
        template: string,
        components: Component[],
    });

    /**
     * Attach a child component
     * 
     * @example
     * 
     * fooComponent.attach(new BarComponent)
     * 
     * @param component 
     * 
     * @throws {ReferenceError} for already attached
     */
    attach(component: Component): Component;

    /**
     * Detach a child component
     * 
     * @example
     * 
     * fooComponent.detach(barComponent)
     * 
     * @param component 
     * 
     * @throws {ReferenceError} for not attached
     */
    detach(component: Component): Component;

    /**
     * Update the component template
     * 
     * @example
     * 
     * const element = fooComponent.update()
     * 
     * @param {HTMLElement} element Selected element
     * 
     * @throws {ReferenceError} for not found selector
     */
    update(): HTMLElement;

    /**
     * Trigger life cycle hook
     * 
     * @example
     * 
     * const decision = fooComponent.lifeCycle('onBack')
     * 
     * 
     * @param hookName
     */
    lifeCycle(hookName: string): boolean

}
