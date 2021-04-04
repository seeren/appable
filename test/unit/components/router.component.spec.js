import { describe, beforeEach, afterEach, it } from 'mocha';

import { assert, expect } from 'chai';

import { window } from '../../window';

import { RouterComponent } from '../../../src/components/router.component';
import { Component } from '../../../src/components/component';

import { Route } from '../../../src/models/route.model';

import { RouteService } from '../../../src/services/route.service';
import { StateService } from '../../../src/services/state.service';

describe('RouterComponent', () => {

    global.window = window;

    let appComponent = null;

    let fooComponent = null;

    let route = null;

    beforeEach(() => {
        appComponent = new Component('app');
        fooComponent = class extends Component { constructor() { super('foo'); } };
        route = new Route('/foo', 'foo', fooComponent);
        RouteService.get().splice(0);
        StateService.get().name = null;
        StateService.get().param = {};
        RouterComponent.components = [];
    });

    describe('attach', () => {
        it('affect route param to attribute', () => {
            RouterComponent.attachRoute(route);
            assert.equal(route, RouterComponent.get());
            RouterComponent.detach(route.component);
        });
        it('construct route component when is constructor', () => {
            route.component = fooComponent;
            RouterComponent.attachRoute(route);
            assert.isObject(route.component);
            RouterComponent.detach(route.component);
        });
    });

    describe('add', () => {
        it('add a route', () => {
            const routeLength = RouteService.get().length;
            RouterComponent.add(route.path, route.name, route.component);
            assert.equal(routeLength + 1, RouteService.get().length);
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
            assert.equal(window.location.pathname, RouterComponent.get().path);
        });
        it('detected rewrited url', () => {
            route.path = '/foo/:id';
            window.history.replaceState({}, 'test', '/foo/2');
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.run(appComponent);
            assert.equal(route.path, RouterComponent.get().path);
        });
    });

    describe('navigate', () => {
        expect(() => RouterComponent.navigate('foo')).to.throw('Route "foo" not found');
        it('navigate to route path', () => {
            RouterComponent.add(route.path, route.name, route.component);
            RouterComponent.navigate(route.name);
            assert.equal(window.location.pathname, RouterComponent.get().path);
        });
        it('do not navigate for same route', () => {
            RouterComponent.add(route.path, route.name, route.component);
            const { row } = RouterComponent;
            RouterComponent.navigate(route.name);
            RouterComponent.navigate(route.name);
            assert.equal(row + 1, RouterComponent.row);
        });
    });

    describe('get', () => {
        console.log(StateService.get());
        expect(() => RouterComponent.get('id')).to.throw('There is no param "id" in the curent state');
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
            RouterComponent.onPopstate({ state: { name: route.name, param: {} } });
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
            RouterComponent.onPopstate({ state: { name: route.name, param: {} }, });
            assert.equal(window.location.pathname, barRoute.path);
        });
        describe('updateEvents', () => it('retrieve this', () => assert.equal(RouterComponent, RouterComponent.updateEvents())));
    });

});
