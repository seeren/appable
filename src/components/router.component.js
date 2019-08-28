import { Component } from "./../../src/index";
import { RouterService } from "../services/router.service";
import { Route } from "../models/route.model";

/**
 * @type {Route[]}
 */
const routes = [];

/**
 * @type {RouterComponent}
 */
export let RouterComponent = new class extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({ selector: "router" });
        window.onpopstate = this.onPopstate.bind(this);
    }

    /**
     * @returns {this}
     */
    update() {
        super.update();
        RouterService.notify();
        return this;
    }

    /**
     * @param {PopStateEvent} event 
     */
    onPopstate(event) {
        this.detach(this.components[0]);
        if (event.state) {
            routes.forEach((route) => {
                if (event.state.name !== route.name) {
                    return;
                }
                RouterService.put(this, route, event.state.param);
            });
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
     * @param {String} name
     * @returns {mixed} 
     */
    get(name) {
        return RouterService.get().param[name]
    }

    /**
     * @param {Route} route
     * @returns {Object|undefined}
     */
    getRouteParam(route) {
        const param = {}
        const explosedPath = window.location.pathname.split("/");
        const explosedRoute = route.path.split("/");
        if (explosedPath.length !== explosedRoute.length) {
            return;
        }
        for (const key in explosedPath) {
            if (":" === explosedRoute[key][0]) {
                param[explosedRoute[key].replace(":", "")] = explosedPath[key]
            } else if (explosedPath[key] !== explosedRoute[key]) {
                return;
            }
        }
        return param;
    }

    /**
     * @param {string} path 
     * @param {string} name 
     * @param {Function} component 
     * @returns {this}
     */
    add(path, name, component) {
        routes.push(new Route(path, name, component));
        return this;
    }

    /**
     * @param {string} name 
     * @param {Object} param 
     */
    navigate(name, param) {
        try {
            routes.forEach((route) => {
                if (name === route.name
                    && route.component !== this.components[0]) {
                    throw route;
                }
            });
        } catch (route) {
            this.detach(this.components[0]);
            RouterService.put(this, route, param, true);
            this.update();
        }
    }

    /**
     * @param {Component} component 
     */
    run(component) {
        let param;
        try {
            routes.forEach((route) => {
                if (route.path === window.location.pathname
                    || (param = this.getRouteParam(route))) {
                    throw route;
                }
            });
            if (routes.length) {
                RouterService.put(this, routes[0]);
            }
        } catch (route) {
            RouterService.put(this, route, param);
        }
        component.attach(this, true).update();
    }

}
