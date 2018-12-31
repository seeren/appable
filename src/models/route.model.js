/**
 * @type {Route}
 */
export class Route {

    /**
     * @param {string} path 
     * @param {string} name 
     * @param {Component} component 
     */
    constructor(path, name, component) {
        this.name = name;
        this.path = path;
        this.component = component;
    }

}