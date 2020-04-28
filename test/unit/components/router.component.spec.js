import { describe, beforeEach, it } from 'mocha';
import { assert, expect } from 'chai';
import { spy } from 'sinon';
import { window } from '../../window';
import { RouterComponent } from '../../../src/components/router.component';
import { Component } from '../../../src/components/component';
import { Route } from '../../../src/models/route.model';
import { RouteService } from '../../../src/services/route.service';

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
        route = new Route('/foo', 'foo', appComponent);
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

});
