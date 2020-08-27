import {
    describe, beforeEach, afterEach, it,
} from 'mocha';
import { assert, expect } from 'chai';
import { window } from '../../window';
import { RouterComponent } from '../../../src/components/router.component';
import { Component } from '../../../src/components/component';
import { Route } from '../../../src/models/route.model';
import { RouteService } from '../../../src/services/route.service';
import { RouterService } from '../../../src/services/router.service';

describe('RouterComponent', () => {

    let appComponent = null;

    let fooComponent = null;
    let route = null;

    beforeEach(() => {
        appComponent = new Component({ selector: 'app', template: '', components: [] });
        fooComponent = class extends Component {

            constructor() { super({ selector: 'foo', template: '', components: [] }); }

        };
        // @ts-ignore
        route = new Route('/foo', 'foo', fooComponent);
    });

    describe('constructor', () => {
        it('basePath is empty string', () => assert.equal('', RouterComponent.basePath));
        it('route is null', () => assert.isNull(RouterComponent.route));
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
            assert.equal(RouterComponent.template, '<foo data-router="0"></foo>');
            assert.equal(appComponent.template, '<router data-app="0"></router>');
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
            RouterService.post(route);
            RouteService.routes = [];
            RouterService.state = { name: null, param: {} };
            RouterComponent.components = [];
        });
    });

    describe('navigate', () => {
        expect(() => RouterComponent.navigate('foo')).to.throw(
            'Route "foo" not found',
        );
        it('navigate to route path', () => {
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.navigate(route.name);
            assert.equal(window.location.pathname, RouterComponent.route.path);
        });
        it('do not navigate for same route', () => {
            RouterComponent.add(route.path, route.name, route.component);
            const { row } = RouterComponent;
            RouterComponent.navigate(route.name);
            RouterComponent.navigate(route.name);
            assert.equal(row, RouterComponent.row);
        });
        afterEach(() => {
            route.path = '/';
            RouterService.post(route);
            RouteService.routes = [];
            RouterService.state = { name: null, param: {} };
        });
    });

    describe('get', () => {
        expect(() => RouterComponent.get('id')).to.throw(
            'There is no "id" param in the curent state',
        );
        it('retrieve current route', () => {
            RouterComponent.add(route.path, route.name, route.component);
            assert.equal(route.path, RouterComponent.get().path);
        });
        it('retrieve current route parameter', () => {
            route = new Route('/foo/:id', 'foo', fooComponent);
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.navigate(route.name, { id: 7 });
            assert.equal(7, RouterComponent.get('id'));
        });
        afterEach(() => {
            route.path = '/';
            RouterService.post(route);
            RouteService.routes = [];
            RouterService.state = { name: null, param: {} };
        });
    });

    describe('onPopstate', () => {
        it('go back on navigation', () => {
            const barRoute = new Route('/bar', 'bar', fooComponent);
            const bazRoute = new Route('/baz', 'baz', fooComponent);
            RouterComponent.add(bazRoute.path, bazRoute.name, bazRoute.component);
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.add(barRoute.path, barRoute.name, barRoute.component);
            RouterComponent.navigate(route.name);
            RouterComponent.navigate(barRoute.name);
            RouterComponent.onPopstate({
                state: { name: route.name, param: {} },
            });
            assert.equal(window.location.pathname, route.path);
        });
        it('go back on navigation when onBack not false', () => {
            appComponent.onBack = () => false;
            const barRoute = new Route('/bar', 'bar', appComponent);
            const bazRoute = new Route('/baz', 'baz', appComponent);
            RouterComponent.add(bazRoute.path, bazRoute.name, bazRoute.component);
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.add(barRoute.path, barRoute.name, barRoute.component);
            RouterComponent.navigate(route.name);
            RouterComponent.navigate(barRoute.name);
            RouterComponent.onPopstate({
                state: { name: route.name, param: {} },
            });
            assert.equal(window.location.pathname, barRoute.path);
        });
        afterEach(() => {
            route.path = '/';
            RouterService.post(route);
            RouteService.routes = [];
            RouterService.state = { name: null, param: {} };
        });
    });

    describe('updateEvents', () => {
        it('retrieve this', () => assert.equal(
            RouterComponent,
            RouterComponent.updateEvents(),
        ));
    });

});
