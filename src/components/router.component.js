import { Component } from './component';
import { Route } from '../models/route.model';
import { RouteService } from '../services/route.service';
import { StateService } from '../services/state.service';

/**
 * @type {RouterComponent}
 */
export const RouterComponent = new class RouterComponent extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: 'router',
            template: '',
        });

        /**
         * @type {String}
         */
        this.basPath = '';

        /**
         * @type {Route}
         */
        this.route = null;

        const scripts = window.document.getElementsByTagName('script');
        Object.keys(scripts).some((key) => {
            const script = scripts[`${key}`];
            if (script.src && -1 !== script.src.indexOf('dist/index.js')) {
                this.basPath = script.src
                    .replace('/dist/index.js', '')
                    .replace(window.location.origin, '');
                return true;
            }
            return false;
        });
    }

    /**
     * @param {Route} route
     * @returns {Component}
     *
     * @throws {ReferenceError}
     */
    attach(route) {
        if (route.component instanceof window.Function) {
            const Attachable = route.component;
            route.component = new Attachable();
        }
        this.route = route;
        return super.attach(route.component);
    }

    /**
     * @param {String} path Route path
     * @param {String} name Route name
     * @param {Component} component Component class or instance
     * @returns {RouterComponent}
     *
     * @throws {ReferenceError} for existing path or name
     */
    add(path, name, component) {
        RouteService.post(`${this.basPath}${path}`, name, component);
        return this;
    }

    /**
     * @param {Component} component Component instance
     * @returns {RouterComponent}
     */
    run(component) {
        window.addEventListener('popstate', (event) => this.onPopstate(event));
        window.document.addEventListener('pause', () => this.lifeCycle('onPause'));
        window.document.addEventListener('resume', () => this.lifeCycle('onResume'));
        let param;
        const routes = RouteService.get();
        try {
            routes.forEach((route) => {
                if (RouteService.constructor.matchLocation(route)) {
                    throw route;
                }
                param = RouteService.constructor.getParam(route);
                if (param) {
                    throw route;
                }
            });
            if (routes.length && !RouteService.constructor.hasParam(routes[0])) {
                throw routes[0];
            }
        } catch (route) {
            StateService.put(route, param);
            this.attach(route);
        }
        component.attach(this, true);
        component.update();
    }

    /**
     * @param {string} name Route name
     * @param {Object} [param] Route param
     *
     * @throws {ReferenceError} for not found route
     */
    navigate(name, param) {
        try {
            RouteService.get().forEach((route) => {
                if (name === route.name) {
                    throw route;
                }
            });
        } catch (route) {
            if (route.component === this.components[0]) {
                return;
            }
            this.detach(this.components[0]);
            StateService.post(route, param);
            this.attach(route);
            this.update();
            return;
        }
        throw new ReferenceError(`Route "${name}" not found`);
    }

    /**
     * @param {String} [paramName]
     * @returns {Route|*}
     *
     * @throws {ReferenceError} for not found parameter name
     */
    get(paramName) {
        if (!paramName) {
            return this.route;
        }
        const param = StateService.get().param[`${paramName}`];
        if (!param) {
            throw new ReferenceError(
                `There is no "${paramName}" param in the curent state`,
            );
        }
        return param;
    }

    /**
     * @param {PopStateEvent} event
     * @returns {Boolean}
     */
    onPopstate(event) {
        if (false === this.lifeCycle('onBack')) {
            const state = StateService.get();
            RouteService.get().forEach((route) => {
                if (route.name === state.name) {
                    StateService.post(route, state.param);
                }
            });
            return false;
        }
        this.detach(this.components[0]);
        if (event.state) {
            RouteService.get().forEach((route) => {
                if (event.state.name === route.name) {
                    StateService.put(route, event.state.param);
                    this.attach(route);
                }
            });
        }
        this.update();
        return true;
    }

}();
