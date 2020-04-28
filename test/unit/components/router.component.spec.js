import {
    describe, beforeEach, afterEach, it,
} from 'mocha';
import { assert, expect } from 'chai';
import { spy } from 'sinon';
import { window } from '../../window';
import { RouterComponent } from '../../../src/components/router.component';
import { Component } from '../../../src/components/component';
import { Route } from '../../../src/models/route.model';
import { RouteService } from '../../../src/services/route.service';
import { StateService } from '../../../src/services/state.service';

describe('RouterComponent', () => {

    let appComponent = null;
    let fooComponent = null;
    let route = null;

    beforeEach(() => {
        appComponent = new Component({ selector: 'app', template: '' });
        fooComponent = class extends Component {

            constructor() {
                super({ selector: 'foo', template: '' });
            }

        };
        route = new Route('/', 'foo', fooComponent);
    });

    describe('constructor', () => {
        it('basePath is empty string', () => {
            assert.equal('', RouterComponent.basePath);
        });
        it('route is null', () => {
            assert.isNull(RouterComponent.route);
        });
    });

    describe('attach', () => {
        it('affect route param to attribute', () => {
            RouterComponent.attach(route);
            assert.equal(route, RouterComponent.route);
            RouterComponent.detach(route.component);

        });
        it('construct route component when is constructor', () => {
            route.component = fooComponent;
            RouterComponent.attach(route);
            assert.isObject(route.component);
            RouterComponent.detach(route.component);
        });
    });

    describe('add', () => {
        it('add a route', () => {
            const routeLength = RouteService.routes.length;
            RouterComponent.add(route.path, route.name, route.component);
            assert.equal(routeLength + 1, RouteService.routes.length);
            RouteService.routes = [];
        });
    });

    describe('run', () => {
        it('dynamise added and runing component', () => {
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.run(appComponent);
            assert.equal(
                RouterComponent.template,
                '<foo data-router="0"></foo>',
            );
            assert.equal(
                appComponent.template,
                '<router data-app="0"></router>',
            );
        });

        it('redirect to route path', () => {
            route.path = '/foo';
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.run(appComponent);
            assert.equal(window.location.pathname, RouterComponent.route.path);
        });

        it('detected rewrited url', () => {
            route.path = '/foo/:id';
            window.history.replaceState({}, 'test', '/foo/2');
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.run(appComponent);
            assert.equal(route.path, RouterComponent.route.path);
        });

        afterEach(() => {
            route.path = '/';
            StateService.post(route);
            RouteService.routes = [];
            StateService.state = { name: null, param: {} };
        });

    });

});
