import { Service } from './service';
import { Route } from '../models/route.model';
import { State } from '../models/state.model';

export const RouterService = new class RouterService extends Service {

    /**
     * @constructor
     */
    constructor() {
        super();

        /**
         * @type {State}
         */
        this.state = new State();
    }

    /**
     * @returns {State}
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
    put(route, param = null) {
        this.history(route, param, true);
    }

    /**
     * @param {Route} route
     * @param {Object} param
     * @param {Boolean} replace
     */
    history(route, param = {}, replace = false) {
        const stateParam = param || {};
        route.path.split('/').forEach(

            /**
             * @param {String} key
             */
            (key) => {
                if (':' !== key[0]) {
                    return false;
                }
                if ('undefined' === typeof stateParam[`${key.substr(1)}`]) {
                    throw new Error(`Slug "${key}" is missing in param`);
                }
                return true;
            },
        );
        Object.keys(stateParam).forEach((key) => {
            if (-1 === route.path.indexOf(`:${key}`)) {
                throw new Error(`Param "${key}" is missing in "${route.path}"`);
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
            this.notify();
            return false;
        }
        window.history.pushState(this.state, route.name, path);
        this.notify();
        return true;
    }

}();
