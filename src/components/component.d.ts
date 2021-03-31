import { ComponentInterface } from "./component.interface";
export declare abstract class Component implements ComponentInterface {
    selector: string;
    template: string;
    components: ComponentInterface[];
    /**
     * @param selector
     * @param template
     * @param components
     */
    constructor(selector: string, template?: string, components?: ComponentInterface[]);
    /**
     * @param type
     * @returns {ThisType}
     */
    emit(type: string): boolean | void;
    /**
     * @param component
     * @returns {ThisType}
     *
     * @throws {ReferenceError} Component already attached
     */
    attach(component: ComponentInterface): ComponentInterface;
    /**
     * @param component
     * @returns {ThisType}
     *
     * @throws {ReferenceError} Component not attached
     */
    detach(component: ComponentInterface): ComponentInterface;
    /**
     * @returns {ThisType}
     */
    update(): ComponentInterface;
}
