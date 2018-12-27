import { Service } from "./service";

/**
 * @type {RouterService}
 */
export const RouterService = new class RouterService extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();
        this.state = {};
    }

    /**
     * @returns {Object}
     */
    get() {
        return this.state;
    }

    /**
     * @param {RouterComponent} router
     * @param {Object} route
     * @param {Object} param
     * @param {boolean} push 
     */
    put(router, route, param, push) {
        let path = route.path;
        this.state.name = route.name;
        this.state.param = param || {}
        for (let prop in this.state.param) {
            path = path.replace(":" + prop, this.state.param[prop])
        }
        if (route.component instanceof window.Function) {
            route.component = new route.component;
        }
        window.history[
            (push ? "pushState" : "replaceState")
        ](this.state, route.name, path);
        router.attach(route.component);
    }

}