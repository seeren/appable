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
    const state = (route, param, push) => {
        let stateObj = { name: route.name };
        let path = route.path;
        if (route.component instanceof window.Function) {
            route.component = new route.component;
        }
        RouterComponent.attach(route.component);
        if (param) {
            stateObj.param = param
            for (let prop in param) {
                path = path.replace(`:${prop}`, param[prop])
            }
        }
        window.history[(push ? `pushState` : `replaceState`)](
            stateObj,
            route.name,
            path
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
            window.onpopstate = this.onpopstate.bind(this);
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
                state(route, param, true);
                this.update();
            }
        }

        /**
         * @returns {void}
         */
        back() {
            window.history.back();
        }

        onpopstate(e) {
            this.detach(this.components[0]);
            if (e.state) {
                state(
                    routes.find(route => e.state.name === route.name),
                    e.state.param
                );
            }
            this.update();
        }

        /**
         * @param {string} path 
         * @param {string} name 
         * @param {Function} component 
         * @returns {this}
         */
        add(path, name, component) {
            routes.push({
                name: name,
                path: path,
                component: component
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