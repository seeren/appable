import { Component } from "../components/component";
import { RouteService } from "../services/route.service";
import { StateService } from "../services/state.service";

/**
 * @type {RouterComponent}
 */
export const RouterComponent = new class extends Component {

    /**
     * @constructor
     */
    constructor() {
        super({
            selector: "router",
            template: ""
        });
        this.basPath = "";
        const scripts = window.document.getElementsByTagName("script");
        for (const key in scripts) {
            if (scripts[key].src
                && -1 !== scripts[key].src.indexOf("dist/index.js")) {
                this.basPath = scripts[key].src
                    .replace("/dist/index.js", "")
                    .replace(window.location.origin, "");
            }
        }
    }

    /**
     * @param {String} path 
     * @param {String} name 
     * @param {Component} component 
     * @returns {RouterComponent}
     * 
     * @throws {ReferenceError}
     */
    add(path, name, component) {
        RouteService.post(`${this.basPath}${path}`, name, component);
        return this;
    }

    /**
     * @param {Component} component 
     */
    run(component) {
        window.addEventListener("popstate", (event) => this.onPopstate(event));
        window.document.addEventListener("pause", () => this.lifeCycle("onPause"));
        window.document.addEventListener("resume", () => this.lifeCycle("onResume"));
        let param;
        const routes = RouteService.get();
        try {
            routes.forEach((route) => {
                if (RouteService.matchLocation(route)
                    || (param = RouteService.getParam(route))) {
                    throw route;
                }
            });
            if (routes.length && !RouteService.hasParam(routes[0])) {
                throw routes[0];
            }
        } catch (route) {
            StateService.put(route, param);
            this.attach(route.component);
        }
        component.attach(this, true);
        component.update();
    }

    /**
     * @param {string} name 
     * @param {Object} param 
     * 
     * @throws {ReferenceError}
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
            this.attach(route.component);
            this.update();
            return;
        }
        throw new ReferenceError(`Route "${name}" not found`);
    }

    /**
     * @param {String} paramName
     * @returns {mixed} 
     * 
     * @throws {ReferenceError}
     */
    get(paramName) {
        const param = StateService.get().param[paramName];
        if (!param) {
            throw new ReferenceError(
                `There is no "${paramName}" param in the curent state`
            );
        }
        return param;
    }

    /**
     * @param {PopStateEvent} event 
     */
    onPopstate(event) {
        if (false === this.lifeCycle("onBack")) {
            const state = StateService.get();
            return RouteService.get().forEach((route) => {
                if (route.name === state.name) {
                    StateService.post(route, state.param);
                }
            });
        }
        this.detach(this.components[0]);
        if (event.state) {
            RouteService.get().forEach((route) => {
                if (event.state.name === route.name) {
                    StateService.put(route, event.state.param);
                    this.attach(route.component);
                }
            });
        }
        this.update();
    }

}
