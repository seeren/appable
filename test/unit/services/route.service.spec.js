import { describe, it } from 'mocha';
import { assert, expect } from 'chai';
import { window } from '../../window';
import { Route } from '../../../src/models/route.model';
import { RouteService } from '../../../src/services/route.service';

describe('RouteService', () => {

    const entryRoute = new Route('/', 'entry');
    const dynamicRoute = new Route('/bar/:bar/baz/:baz', 'bar');

    describe('routes', () => {
        it('is an array', () => {
            assert.isArray(RouteService.routes);
        });
    });

    describe('get', () => {
        it('retrieve routes', () => {
            assert.equal(RouteService.routes, RouteService.get());
        });
    });

    describe('post', () => {
        it('add a route', () => {
            const lengthBefore = RouteService.routes.length;
            RouteService.post('/foo', 'foo');
            assert.equal(lengthBefore + 1, RouteService.routes.length);
        });
        it('Throw ReferenceError for existing path', () => {
            expect(() => {
                RouteService.post('/foo', 'fail');
            }).to.throw(
                'Can\'t add route: path "/foo" already exists',
            );
        });
        it('Throw ReferenceError for existing name', () => {
            expect(() => {
                RouteService.post('/fail', 'foo');
            }).to.throw(
                'Can\'t add route: name "foo" already exists',
            );
        });
    });

    describe('matchLocation', () => {
        it('is route path equal window.location', () => {
            assert.isTrue(RouteService.constructor.matchLocation(entryRoute));
        });
    });

    describe('hasParam', () => {
        it('has route dynamic param', () => {
            assert.isFalse(RouteService.constructor.hasParam(entryRoute));
            assert.isTrue(RouteService.constructor.hasParam(dynamicRoute));
        });
    });

    describe('getParam', () => {
        it('false when path length are different', () => {
            assert.isFalse(RouteService.constructor.getParam(dynamicRoute));
        });
        it('false for static path part is different from location', () => {
            window.history.replaceState({}, 'test', '/bar/7/test/77');
            assert.isFalse(RouteService.constructor.getParam(dynamicRoute));
        });
        it('false when route path parts are not dynamised', () => {
            window.history.replaceState({}, 'test', '/bar/7/baz/:baz');
            assert.isFalse(RouteService.constructor.getParam(dynamicRoute));
        });
        it('param when route path parts are dynamised', () => {
            window.history.replaceState({}, 'test', '/bar/7/baz/77');
            assert.isObject(RouteService.constructor.getParam(dynamicRoute));
        });
    });

});
