import { Service } from "./service";

/**
 * @type {StateService}
 */
export const StateService = new class StateService extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();

        /**
         * @type {Object}
         */
        this.state = {
            name: null,
            param: {}
        };

    }

    /**
     * @returns {Object}
     */
    get() {
        return this.state;
    }

    /**
     * @param {Route} route
     * @param {Object} param
     */
    post(route, param) {
        this.history(route, param);
    }

    /**
     * @param {Route} route
     * @param {Object} param
     */
    put(route, param) {
        this.history(route, param, true);
    }

    /**
     * @param {Route} route 
     * @param {Object} param 
     * @param {Boolean} replace 
     */
    history(route, param, replace) {
        let path = route.path;
        this.state.name = route.name;
        this.state.param = param || {};
        for (let prop in this.state.param) {
            if (this.state.param.hasOwnProperty(prop)) {
                path = path.replace(`:${prop}`, this.state.param[prop]);
            }
        }
        if (replace) {
            return window.history.replaceState(this.state, route.name, path);
        }
        window.history.pushState(this.state, route.name, path);
    }

};
