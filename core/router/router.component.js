import { Component } from "../component";
import { template } from './router.component.html';

/**
 * @type {Array}
 */
const routes = [];

/**
 * @type {Object}
 */
const state = {};

/**
 * @param {Object} route 
 * @param {boolean} push 
 */
const setState = (route, param, push) => {
    let path = route.path;
    state.name = route.name;
    state.param = param || {}
    for (let prop in state.param) {
        path = path.replace(`:${prop}`, state.param[prop])
    }
    if (route.component instanceof window.Function) {
        route.component = new route.component;
    }
    RouterComponent.attach(route.component);
    window.history[(push ? `pushState` : `replaceState`)](
        state,
        route.name,
        path
    );
};

/**
 * @type {Router}
 */
export let RouterComponent = new class extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: `router`,
            template: template
        });
        window.onpopstate = this.onpopstate.bind(this);
    }

    /**
     * @param {Event} e 
     */
    onpopstate(e) {
        this.detach(this.components[0]);
        if (e.state) {
            setState(
                routes.find(route => e.state.name === route.name),
                e.state.param
            );
        }
        this.update();
    }

    /**
     * @returns {void}
     */
    back() {
        window.history.back();
    }

    /**
     * @param {string} name 
     * @param {Object} param 
     * @returns {void}
     */
    navigate(name, param) {
        let route = routes.find(route => name === route.name);
        if (route.component !== this.components[0]) {
            this.detach(this.components[0]);
            setState(route, param, true);
            this.update();
        }
    }

    /**
     * @param {String} name
     * @returns {mixed} 
     */
    get(name) {
        return state.param[name]
    }

    /**
     * @param {string} path 
     * @param {string} name 
     * @param {Function} component 
     * @returns {this}
     */
    add(path, name, component) {
        routes.push({
            name: name,
            path: path,
            component: component
        });
        return this;
    }

    /**
     * @returns {void}
     */
    run(component) {
        let route = routes.find(route => route.path === window.location.pathname);
        if (route) {
            setState(route);
        }
        component.attach(this, true).update();
    }

}
