import { Service } from './service';
import { Route } from '../models/route.model';
export declare const RouteService: {
    /**
     * @returns {Route[]}
     */
    get(): Route[];
    /**
     * @param route
     * @returns { { [key: string]: string | number } }
     *
     * @throws {Error} Location and route do not match
     * @throws {Error} Route slug is not populated
     */
    getParam(route: Route): {
        [key: string]: string | number;
    };
    attach(callable: Function): Service;
    detach(callable: Function): Service;
    notify(): Service;
};
