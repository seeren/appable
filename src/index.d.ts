declare module "appable" {

    export class Component {

        row: number;
    
        selector: string;
    
        template: string;
    
        components: [];
    
        /**
         * @param option 
         */
        constructor(option: {
            selector: string,
            template: string,
            components?: Component[],
        });
    
        /**
         * Attach a child component
         * 
         * @example
         * 
         * fooComponent.attach(new BarComponent)
         * 
         * @param component 
         * 
         * @throws {ReferenceError} for already attached
         */
        attach(component: Component): Component;
    
        /**
         * Detach a child component
         * 
         * @example
         * 
         * fooComponent.detach(barComponent)
         * 
         * @param component 
         * 
         * @throws {ReferenceError} for not attached
         */
        detach(component: Component): Component;
    
        /**
         * Update the component template
         * 
         * @example
         * 
         * const element = fooComponent.update()
         * 
         * @param {HTMLElement} element Selected element
         * 
         * @throws {ReferenceError} for not found selector
         */
        update(): HTMLElement;
    
        /**
         * Trigger life cycle hook
         * 
         * @example
         * 
         * const decision = fooComponent.lifeCycle('onBack')
         * 
         * 
         * @param hookName
         */
        lifeCycle(hookName: string): boolean
    
    }

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

    export const RouterService = new class RouterService extends Service {
    
        state: State;
    
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

    export class Route {
    
        path: string;
    
        name: string;
    
        component: Component;
    
        /**
         * @param path 
         * @param name 
         * @param component 
         */
        constructor(
            path: string,
            name: string,
            component: Component
        );
    
    }

    export class State {

        name: string;
    
        param: Object;
    
    }

    export class Service {

        constructor();
    
        /**   
         * Attach a callable
         * 
         * @example
         * 
         * const callable = s => console.log(s);
         * FooService.attach(callable)
         * 
         * @param callable 
         */
        attach(callable: Function): Service;
    
        /**   
         * Detach a callable
         * 
         * @example
         * 
         * const callable = s => console.log(s);
         * FooService.detach(callable)
         * 
         * @param callable 
         */
        detach(callable: Function): Service;
    
        /**
         * Call attached callables
         * 
         * @example
         * 
         * FooService.notify()
         */
        notify(): Service;
    
    }

}
