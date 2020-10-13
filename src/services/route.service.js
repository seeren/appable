import { Service } from './service';
import { Route } from '../models/route.model';
import { Component } from '../components/component';

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
                throw new ReferenceError(`Can't add route: path "${path}" already exists`);
            }
            if (name === route.name) {
                throw new ReferenceError(`Can't add route: name "${name}" already exists`);
            }
        });
        this.routes.push(new Route(path, name, component));
    }

    /**
     * @param {Route} route
     * @returns {Boolean}
     */
    static matchLocation(route) {
        return !RouteService.hasParam(route) && route.path === window.location.pathname;
    }

    /**
     * @param {Route} route
     * @returns {Boolean}
     */
    static hasParam(route) {
        return -1 !== route.path.indexOf(':');
    }

    /**
     * @param {Route} route
     * @returns {Object|Boolean}
     */
    static getParam(route) {
        const param = {};
        const explosedPath = window.location.pathname.split('/');
        const explosedRoute = route.path.split('/');
        try {
            if (explosedPath.length !== explosedRoute.length) {
                throw new Error('Location path length is different to route path length');
            }
            Object.keys(explosedPath).forEach((key) => {
                const routePart = explosedRoute[`${key}`];
                const pathPart = explosedPath[`${key}`];
                if (':' === routePart[0]) {
                    param[routePart.replace(':', '')] = pathPart;
                } else if (pathPart !== routePart) {
                    throw new Error(`Route part "${routePart}" not found and is different to Location part`);
                }
            });
            Object.keys(param).forEach((key) => {
                if (`:${key}` === param[`${key}`]) {
                    throw new Error(`Route slug "${key}" is not populated`);
                }
            });
        } catch (error) {
            return false;
        }
        return param;
    }

}();
