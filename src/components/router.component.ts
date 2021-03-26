import { Component } from './component';
import { ComponentInterface } from './component.interface';

import { Route } from '../models/route.model';

import { RouteService } from '../services/route.service';
import { StateService } from '../services/state.service';
import { State } from '../models/state.model';

export const RouterComponent = new class RouterComponent extends Component {

    private includePath: string = '';

    private route: Route;

    constructor() {
        super('router');
        const scripts = window.document.getElementsByTagName('script');
        Object.keys(scripts).some((key) => {
            const script = scripts[parseInt(key)];
            if (script.src && -1 !== script.src.indexOf('dist/appable.js')) {
                this.includePath = script.src
                    .replace('/dist/appable.js', '')
                    .replace(window.location.origin, '');
                return true;
            }
            return false;
        });
    }

    /**
     * @param path 
     * @param name 
     * @param component 
     * @returns {ThisType} 
     */
    public add(
        path: string,
        name: string,
        component: ComponentInterface): RouterComponent {
        RouteService.post(`${this.includePath}${path}`, name, component);
        return this;
    }

    /**
     * @param component 
     * @returns {ThisType}
     */
    public run(component: Component): RouterComponent {
        window.addEventListener('popstate', (event: PopStateEvent) => this.onPopstate(event));
        window.document.addEventListener('pause', () => {
            (component as ComponentInterface).onPause && (component as ComponentInterface).onPause();
            this.components.forEach((component: ComponentInterface) => component.onPause && component.onPause());
        });
        window.document.addEventListener('resume', () => {
            (component as ComponentInterface).onResume && (component as ComponentInterface).onResume();
            this.components.forEach((component: ComponentInterface) => component.onResume && component.onResume());
        });
        let param: { [key: string]: string | number };
        const routes: Route[] = RouteService.get();
        try {
            routes.forEach((route: Route) => {
                if (RouteService.matchLocation(route)) {
                    throw route;
                }
                try {
                    param = RouteService.getParam(route);
                } catch (error) { }
                if (param) {
                    throw route;
                }
            });
            if (routes.length && !RouteService.hasParam(routes[0])) {
                throw routes[0];
            }
        } catch (route) {
            StateService.put(route, param);
            this.attachRoute(route);
        }
        component.attach(this);
        component.update();
        return this;
    }

    /**
     * @returns {ThisType}
     */
    public back(): RouterComponent {
        window.history.back();
        return this;
    }

    /**
     * 
     * @param name 
     * @param param 
     * 
     * @throws {ReferenceError} Route not found
     */
    public navigate(
        name: string,
        param: { [key: string]: string | number }): void {
        try {
            RouteService.get().forEach((route: Route) => {
                if (name === route.name) {
                    throw route;
                }
            });
        } catch (route) {
            if (0 < this.components.length) {
                if (this.components[0] === route.component) {
                    return;
                }
                this.detach(this.components[0]);
            }
            StateService.post(route, param);
            this.attach(route);
            this.update();
            return;
        }
        throw new ReferenceError(`Route "${name}" not found`);
    }

    /**
     * @param name 
     * @returns {Route | string | number}
     * 
     * @throws {ReferenceError} Param name not found
     */
    public get(name?: string): Route | string | number {
        if (!name) {
            return this.route;
        }
        const param = StateService.get().param[`${name}`];
        if (!param) {
            throw new ReferenceError(`There is no param "${name}" in the curent state`);
        }
        return param;
    }

    /**
     * @param route 
     * @returns {ThisType}
     */
    private attachRoute(route: Route): ComponentInterface {
        if (route.component instanceof window.Function) {
            const Attachable = route.component;
            route.component = new (Attachable as any)();
        }
        this.route = route;
        return this.attach(route.component);
    }

    /**
     * @param event 
     * @returns {boolean}
     */
    private onPopstate(event: PopStateEvent): boolean {
        let navigateBack: boolean;
        this.components.forEach((component: ComponentInterface) => {
            if (component.onBack && false === component.onBack()) {
                navigateBack = false;
            }
        });
        if (false === navigateBack) {
            const state: State = StateService.get();
            RouteService.get().some((route: Route) => {
                if (route.name === state.name) {
                    StateService.post(route, state.param);
                    return true;
                }
                return false;
            });
            return false;
        }
        this.detach(this.components[0]);
        if (event.state) {
            RouteService.get().some((route: Route) => {
                if (event.state.name === route.name) {
                    StateService.put(route, event.state.param);
                    this.attachRoute(route);
                    return true;
                }
                return false;
            });
        }
        this.update();
        return true;
    }

    /**
     * @returns {ThisType}
     */
    protected updateEvents(): ComponentInterface {
        return this;
    }

}();
