declare module 'appable' {

    export class Component {

        selector: string;

        template: string;

        components: [] = [];

        /**
         * @param option 
         */
        constructor(option: {
            selector: string,
            template: string,
            components: [] = [],
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

    export const RouterComponent = new class RouterComponent extends Component {

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
         * Navigate to a Route
         *
         *  @example
         * 
         * RouterComponent.navigate("foo, { id: 3 })
         * 
         * @param name 
         * @param param
         * 
         * @throws {ReferenceError} for not found route 
         */
        navigate(name: string, param: string): void;

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
        get(paramName: string): Route | *;

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
         * FooService.notify()
         */
        notify(): Service;

    }

}
