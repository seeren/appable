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
        super({
            selector: "router"
        });
        window.onpopstate = this.onPopstate.bind(this);
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
     * @returns {this}
     */
    update() {
        super.update();
        RouterService.notify();
        return this;
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
     * @throws {Error}
     */
    navigate(name, param) {
        routes.forEach((route) => {
            if (name !== route.name) {
                return;
            }
            if (route.component !== this.components[0]) {
                this.detach(this.components[0]);
                RouterService.put(this, route, param, true);
                this.update();
                return;
            }
            throw new Error(`Route '${name}' not found`);
        });
    }

    /**
     * @param {String} name
     * @returns {mixed} 
     */
    get(name) {
        return RouterService.get().param[name]
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
     * @param {Component} component 
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
            RouterService.put(this, route, param);
        } else if (routes.length) {
            RouterService.put(this, routes[0]);
        }
        component.attach(this, true).update();
    }

}