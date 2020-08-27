import { Service } from './service';
import { Route } from '../models/route.model';

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
    post(route, param = null) {
        this.history(route, param);
    }

    /**
     * @param {Route} route
     * @param {Object} param
     */
    put(route, param = {}) {
        this.history(route, param, true);
    }

    /**
     * @param {Route} route
     * @param {Object} param
     * @param {Boolean} replace
     */
    history(route, param = {}, replace = false) {
        const stateParam = param || {};
        route.path.split('/').forEach((key) => {
            if (':' !== key[0]) {
                return false;
            }
            if ('undefined' === typeof stateParam[`${key.substr(1)}`]) {
                throw new Error(`Navigation route part "${key}" is missing in param`);
            }
            return true;
        });
        Object.keys(stateParam).forEach((key) => {
            if (-1 === route.path.indexOf(`:${key}`)) {
                throw new Error(
                    `Navigation param "${key}" not found in "${route.path}"`,
                );
            }
        });
        let { path } = route;
        this.state.name = route.name;
        this.state.param = stateParam;
        Object.keys(this.state.param).forEach((key) => {
            path = path.replace(`:${key}`, this.state.param[`${key}`]);
        });
        if (replace) {
            window.history.replaceState(this.state, route.name, path);
            return false;
        }
        window.history.pushState(this.state, route.name, path);
        return true;
    }

}();
