import { Service } from './service';

import { Route } from '../models/route.model';

import { ComponentInterface } from '../components/component.interface';

export const RouteService = new class RouteService extends Service {

    private routes: Route[] = [];

    /**
     * @returns {Route[]}
     */
    public get(): Route[] {
        return this.routes;
    }

    /**
     * @param path 
     * @param name 
     * @param component 
     * 
     * @throws {ReferenceError} Route already added
     */
    public post(
        path: string,
        name: string,
        component: ComponentInterface): void {
        this.routes.forEach((route: Route) => {
            if (path === route.path) {
                throw new ReferenceError(`Can't add route: path "${path}" already exists`);
            }
            if (name === route.name) {
                throw new ReferenceError(`Can't add route: name "${name}" already exists`);
            }
        });
        this.routes.push({ path, name, component });
    }

    /**
     * @param route 
     * @returns {boolean}
     */
    public matchLocation(route: Route): boolean {
        return !this.hasParam(route) && route.path === window.location.pathname;
    }

    /**
     * @param {Route} route
     * @returns {Boolean}
     */
    public hasParam(route: Route): boolean {
        return -1 !== route.path.indexOf(':');
    }

    /**
     * @param route 
     * @returns { { [key: string]: string | number } }
     * 
     * @throws {Error} Location and route do not match
     * @throws {Error} Route slug is not populated
     */
    public getParam(route: Route): { [key: string]: string | number } {
        const param: { [key: string]: string | number } = {};
        const explosedPath: string[] = window.location.pathname.split('/');
        const explosedRoute: string[] = route.path.split('/');
        if (explosedPath.length !== explosedRoute.length) {
            throw new Error('Location path length is different to route path length');
        }
        Object.keys(explosedPath).forEach((key) => {
            const routePart = explosedRoute[key as any];
            const pathPart = explosedPath[key as any];
            if (':' === routePart[0]) {
                param[routePart.replace(':', '')] = pathPart;
            } else if (pathPart !== routePart) {
                throw new Error(`Route part "${routePart}" not found`);
            }
        });
        Object.keys(param).forEach((key) => {
            if (`:${key}` === param[key]) {
                throw new Error(`Route slug "${key}" is not populated`);
            }
        });
        return param;
    }

}();
