/**
 * @type {Router}
 */
export let Router = (() => {

    /**
     * @type {Component}
     */
    let component;

    /**
     * @type {Array}
     */
    let routes = [];

    let update = (route, push) => {
        if (route.component instanceof Function) {
            route.component = new route.component;
        }
        component.attach(route.component);
        window.history[push ? `pushState` : `replaceState`](
            { name: route.name },
            route.name,
            route.path
        );
    }

    return class Router {

        /**
         * @constructor
         */
        constructor() {
            window.onpopstate = (e) => {
                component.clear();
                if (e.state) {
                    update(routes.find(route => e.state.name === route.name));
                }
                component.update();
            };
        }

        /**
         * @param {string} name 
         * @param {Object} param 
         * @returns {void}
         */
        static navigate(name, param) {
            let route = routes.find(route => name === route.name);
            if (route.component !== component.components[0]) {
                console.log("navigate")
                component.clear();
                update(route, true);
                component.update();
            }
        }

        /**
         * @returns {void}
         */
        static back() {
            window.history.back();
        }


        /**
         * @param {Component} entryPoint
         * @returns {void}
         */
        run(entryPoint) {
            component = new entryPoint;
            let route = routes.find(route => route.path === window.location.pathname);
            if (route) {
                update(route);
            }
            component.update();
        }

        /**
         * @param {string} path 
         * @param {string} name 
         * @param {Function} component 
         * @param {Object} param
         * @returns {this}
         */
        add(path, name, component, param) {
            routes.push({ name: name, path: path, component: component, param: param || {} });
            return this;
        }

        /**
         * @param {string} name 
         * @returns {this}
         */
        remove(name) {
            for (let key in routes) {
                if (name === routes[key].name) {
                    routes.splice(key, 1);
                    break;
                }
            }
            return this;
        }

    }

})();