import { describe, it } from 'mocha';

import { assert, expect } from 'chai';

import { window } from '../../window';

import { Route } from '../../../src/models/route.model';

import { RouteService } from '../../../src/services/route.service';

describe('RouteService', () => {

    global.window = window;

    const entryRoute = new Route('/', 'entry');

    const dynamicRoute = new Route('/bar/:bar/baz/:baz', 'bar');

    describe('routes', () => it('is an array', () => assert.isArray(RouteService.get())));

    describe('post', () => {
        it('add a route', () => {
            const lengthBefore = RouteService.get().length;
            RouteService.post('/foo', 'foo');
            assert.equal(lengthBefore + 1, RouteService.get().length);
        });
        it('throw ReferenceError for existing path', () => expect(() =>
            RouteService.post('/foo', 'fail')
        ).to.throw('Can\'t add route: path "/foo" already exists',));
        it('throw ReferenceError for existing name', () => expect(() => {
            RouteService.post('/fail', 'foo');
        }).to.throw('Can\'t add route: name "foo" already exists'));
    });

    describe('matchLocation', () =>
        it('is route path equal window.location', () => assert.isTrue(RouteService.matchLocation(new Route(window.location.pathname, 'foo'))))
    );

    describe('hasParam', () =>
        it('has route dynamic param', () => {
            assert.isFalse(RouteService.hasParam(entryRoute));
            assert.isTrue(RouteService.hasParam(dynamicRoute));
        })
    );

    describe('getParam', () => {
        it('throw Error when length are differents', () => expect(() => RouteService.getParam(dynamicRoute))
            .throw('Location path length is different to route path length')
        );
        it('throw Error when path part not found', () => expect(() => {
            window.history.replaceState({}, 'test', '/bar/7/test/77');
            assert.isFalse(RouteService.getParam(dynamicRoute));
        }).throw('Route part "baz" not found'));
        it('throw Error when slug is not populated', () => expect(() => {
            window.history.replaceState({}, 'test', '/bar/7/baz/:baz');
            assert.isFalse(RouteService.getParam(dynamicRoute));
        }).throw('Route slug "baz" is not populated'));
        it('param when route path parts are dynamised', () => {
            window.history.replaceState({}, 'test', '/bar/7/baz/77');
            assert.isObject(RouteService.getParam(dynamicRoute));
        });
    });

});
