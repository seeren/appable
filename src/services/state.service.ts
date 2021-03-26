import { Service } from './service';

import { State } from '../models/state.model';
import { Route } from '../models/route.model';

export const StateService = new class StateService extends Service {

    private state: State = new State();

    /**
     * @returns {State}
     */
    public get(): State {
        return this.state;
    }

    /**
     * @param route 
     * @param param 
     * @returns {boolean}
     */
    public post(
        route: Route,
        param?: { [key: string]: string | number }): boolean {
        return this.history(route, param);
    }

    /**
     * @param route 
     * @param param 
     * @returns {boolean}
     */
    public put(
        route: Route,
        param?: { [key: string]: string | number }): boolean {
        return this.history(route, param, true);
    }

    /**
     * @param route 
     * @param param 
     * @param replace 
     * @returns {boolean}
     * 
     * @throws {Error} Route slug do not match State param
     */
    public history(
        route: Route,
        param: { [key: string]: string | number } = {}, replace: boolean = false): boolean {
        route.path.split('/').forEach((key: string) => {
            if (':' === key[0] && 'undefined' === typeof param[key.substring(1)]) {
                throw new Error(`Slug "${key}" is missing in param`);
            }
        });
        Object.keys(param).forEach((key: string) => {
            if (-1 === route.path.indexOf(`:${key}`)) {
                throw new Error(`Param "${key}" is missing in "${route.path}"`);
            }
        });
        let { path } = route;
        this.state.name = route.name;
        this.state.param = param;
        Object.keys(this.state.param).forEach(
            (key: string) => path = path.replace(`:${key}`, `${this.state.param[key]}`)
        );
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
