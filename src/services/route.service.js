import { Service } from "./service";
import { Route } from "../models/route.model";

/**
 * @type {RouteService}
 */
export const RouteService = new class RouteService extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();

        /**
         * @type {Route[]}
         */
        this.routes = [];
    }

    /**
     * @returns {Route[]}
     */
    get() {
        return this.routes;
    }

    /**
     * @param {String} path 
     * @param {String} name 
     * @param {Component} component 
     * 
     * @throws {ReferenceError}
     */
    post(path, name, component) {
        this.routes.forEach((route) => {
            if (path === route.path) {
                throw new ReferenceError(
                    `Can't add route: path "${path}" already exists`
                );
            }
            if (name === route.name) {
                throw new ReferenceError(
                    `Can't add route: name "${name}" already exists`
                );
            }
        });
        this.routes.push(new Route(path, name, component));
    }

    /**
     * @param {Route} route 
     * @returns {Boolean}
     */
    hasParam(route) {
        return -1 !== route.path.indexOf(":");
    }

    /**
     * @param {Route} route
     * @returns {Object|undefined}
     */
    getParam(route) {
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
        for (const key in param) {
            if (`:${key}` === param[key]) {
                return;
            }
        }
        return param;
    }

    /**
     * @param {Route} route 
     * @returns {Boolean}
     */
    matchLocation(route) {
        return !this.hasParam(route) && route.path === window.location.pathname;
    }

}

