import { ComponentInterface } from '../components/component.interface';
export declare class Route {
    path: string;
    name: string;
    component: ComponentInterface;
    /**
     * @param path
     * @param name
     * @param component
     */
    constructor(path: string, name: string, component: ComponentInterface);
}
