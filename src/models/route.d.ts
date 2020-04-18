import { Component } from "../components/component";

export class Route {

    path: string;

    name: string;

    component: Component;

    /**
     * @param path 
     * @param name 
     * @param component 
     */
    constructor(
        path: string,
        name: string,
        component: Component
    );

}
