import { Component } from './component';
import { ComponentInterface } from './component.interface';
import { Route } from '../models/route.model';
export declare const RouterComponent: {
    /**
     * @param path
     * @param name
     * @param component
     * @returns {ThisType}
     */
    add(path: string, name: string, component: ComponentInterface): any;
    /**
     * @param component
     * @returns {ThisType}
     */
    run(component: Component): any;
    /**
     * @returns {ThisType}
     */
    back(): any;
    /**
     * @param name
     * @param param
     *
     * @throws {ReferenceError} Route not found
     */
    navigate(name: string, param: {
        [key: string]: string | number;
    }): void;
    /**
     * @param name
     * @returns {Route | string | number}
     *
     * @throws {ReferenceError} Param name not found
     */
    get(name?: string): Route | string | number;
    components: ComponentInterface[];
    selector: string;
    template: string;
    emit(type: string): boolean | void;
    attach(component: ComponentInterface): ComponentInterface;
    detach(component: ComponentInterface): ComponentInterface;
    update(): ComponentInterface;
};
