import { Component } from "./component";
import { RouterService } from "./router.service";

/**
 * @type {Array}
 */
const routes = [];

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
            RouterService.put(this, routes.find(
                route => e.state.name === route.name
            ), e.state.param);
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
     */
    navigate(name, param) {
        const route = routes.find(route => name === route.name);
        if (route.component !== this.components[0]) {
            this.detach(this.components[0]);
            RouterService.put(this, route, param, true);
            this.update();
        }
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
        routes.push({
            name: name,
            path: path,
            component: component
        });
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