import { Component } from "./component";

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
 * @param {Object} param
 * @param {boolean} push 
 */
const setState = (route, param, push) => {
    let path = route.path;
    state.name = route.name;
    state.param = param || {}
    for (let prop in state.param) {
        path = path.replace(":" + prop, state.param[prop])
    }
    if (route.component instanceof window.Function) {
        route.component = new route.component;
    }
    RouterComponent.attach(route.component);
    window.history[(push ? "pushState" : "replaceState")](
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
            selector: "router",
            template: ""
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
        const route = routes.find(route => name === route.name);
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
        let param = {}
        const route = routes.find(route => {
            if (route.path === window.location.pathname) {
                return true;
            }
            let explosedPath = window.location.pathname.split("/");
            let explosedRoute = route.path.split("/");
            if (explosedPath.length !== explosedRoute.length) {
                return false;
            }
            for (let key in explosedPath) {
                if (":" === explosedRoute[key][0]) {
                    param[explosedRoute[key].replace(":", "")] = explosedPath[key]
                } else if (explosedPath[key] !== explosedRoute[key]) {
                    param = {};
                    return false;
                }
            }
            return true;
        });
        if (route) {
            setState(route, param);
        } else if (routes.length) {
            setState(routes[0]);
        }
        component.attach(this, true).update();
    }

}
