import { Component } from "../component";
import { template } from './router.component.html';

/**
 * @type {Router}
 */
export let RouterComponent = (() => {

    /**
     * @type {Array}
     */
    const routes = [];

    /**
     * @param {Object} route 
     * @param {boolean} push 
     */
    const state = (route, push) => {
        if (route.component instanceof window.Function) {
            route.component = new route.component;
        }
        RouterComponent.attach(route.component);
        window.history[(push ? `pushState` : `replaceState`)](
            { name: route.name },
            route.name,
            route.path
        );
    };

    return new class RouterComponent extends Component {

        /**
         * @constructor
         */
        constructor() {
            super({
                selector: `router`,
                template: template
            });
            window.onpopstate = (e) => {
                this.detach(this.components[0]);
                if (e.state) {
                    state(routes.find(route => e.state.name === route.name));
                }
                this.update();
            };
        }

        /**
         * @returns {void}
         */
        back() {
            window.history.back();
        }

        /**
         * @param {string} name 
         * @param {Object} param 
         * @returns {void}
         */
        navigate(name, param) {
            let route = routes.find(route => name === route.name);
            if (route.component !== this.components[0]) {
                this.detach(this.components[0]);
                state(route, true);
                this.update();
            }
        }


        /**
         * @param {string} path 
         * @param {string} name 
         * @param {Function} component 
         * @param {Object} param
         * @returns {this}
         */
        add(path, name, component, param) {
            routes.push({
                name: name,
                path: path,
                component: component,
                param: param || {}
            });
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

        /**
         * @returns {void}
         */
        to(component) {
            let route = routes.find(route => route.path === window.location.pathname);
            if (route) {
                state(route);
            }
            component.attach(this, true).update();
        }

    }

})();