import { Service } from './service';

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
            param: {},
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
        let { path } = route;
        this.state.name = route.name;
        this.state.param = param || {};
        Object.keys(this.state.param).some((key) => {
            if (this.state.param.hasOwnProperty(key)) {
                path = path.replace(`:${key}`, this.state.param[`${key}`]);
                return true;
            }
            return false;
        });
        if (replace) {
            window.history.replaceState(this.state, route.name, path);
            return true;
        }
        window.history.pushState(this.state, route.name, path);
        return false;
    }

}();
