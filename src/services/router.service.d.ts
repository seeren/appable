import { Service } from "./service";
import { Route } from "appable";
import { State } from "../models/state.model";

export const RouterService = new class RouterService extends Service {

    /**
     * Replace entry in history
     * 
     * @param route 
     * @param param 
     */
    put(route: Route, param: Object = null): void;

    /**
     * Add entry in history
     * 
     * @param route 
     * @param param 
     */
    post(route: Route, param: Object = null): void;

    /**
     * Retrieve state
     */
    get(): State;

}
