import { Component } from "./component";
import { Route } from "../models/route.model";

export const RouterComponent = new class RouterComponent extends Component {

    basePath: string;

    route: Route;

    constructor();

    /**
     * Add a route
     * 
     * @example
     * 
     * RouterComponent.add('/bar/:id', 'bar', BarComponent)
     * 
     * @param path 
     * @param name 
     * @param component 
     * 
     * @throws {ReferenceError} for existing path or name
     */
    add(path: string, name: string, component: Component): RouterComponent;

    /**
     * Run the entry point
     * 
     * @example
     * 
     * RouterComponent.run(new AppComponent)
     * 
     * @param component 
     */
    run(component: Component): RouterComponent;

    /**
     * Navigate back
     *
     *  @example
     * 
     * RouterComponent.back()
     * 
     * @returns {RouterComponent}
     */
    back(): RouterComponent;

    /**
     * Navigate to a Route
     *
     *  @example
     * 
     * RouterComponent.navigate("foo", { id: 3 })
     * 
     * @param name 
     * @param param
     * 
     * @throws {ReferenceError} for not found route 
     */
    navigate(name: string, param: object = null): void;

    /**
     * Retrieve the current Route or a Route parameter value
     * 
     * @example
     * 
     * const route = RouterComponent.get()
     * const id = RouterComponent.get("id")
     * 
     * @param paramName 
     * 
     * @throws {ReferenceError} for not found parameter name
     */
    get(paramName: string = null): Route | *;

    /**
     * PopStateEvent event handler
     * 
     * @param event
     */
    onPopstate(event: Object): bool;

    /**
     * Cancel parent component to update template evants
     */
    updateEvents(): RouterComponent;

}
