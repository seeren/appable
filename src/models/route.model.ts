import { ComponentInterface } from '../components/component.interface';

export class Route {

    /**
     * @param path 
     * @param name 
     * @param component 
     */
    constructor(
        public path: string,
        public name: string,
        public component: ComponentInterface) { }

}
