import { describe, it } from 'mocha';
import { assert, expect } from 'chai';
import { window } from '../../window';
import { Route } from '../../../src/models/route.model';
import { RouteService } from '../../../src/services/route.service';

describe('RouteService', () => {

    // @ts-ignore
    const entryRoute = new Route('/', 'entry');
    // @ts-ignore
    const dynamicRoute = new Route('/bar/:bar/baz/:baz', 'bar');

    describe('routes', () => {
        it('is an array', () => assert.isArray(RouteService.routes));
    });

    describe('get', () => {
        it('retrieve routes', () => assert.equal(
            RouteService.routes,
            RouteService.get(),
        ));
    });

    describe('post', () => {
        it('add a route', () => {
            const lengthBefore = RouteService.routes.length;
            // @ts-ignore
            RouteService.post('/foo', 'foo');
            assert.equal(lengthBefore + 1, RouteService.routes.length);
        });
        it('throw ReferenceError for existing path', () => expect(() => {
            // @ts-ignore
            RouteService.post('/foo', 'fail');
        }).to.throw(
            'Can\'t add route: path "/foo" already exists',
        ));
        it('throw ReferenceError for existing name', () => expect(() => {
            // @ts-ignore
            RouteService.post('/fail', 'foo');
        }).to.throw(
            'Can\'t add route: name "foo" already exists',
        ));
    });

    describe('matchLocation', () => {
        it('is route path equal window.location', () => {
            // @ts-ignore
            assert.isTrue(RouteService.constructor.matchLocation(entryRoute));
        });
    });

    describe('hasParam', () => {
        it('has route dynamic param', () => {
            // @ts-ignore
            assert.isFalse(RouteService.constructor.hasParam(entryRoute));
            // @ts-ignore
            assert.isTrue(RouteService.constructor.hasParam(dynamicRoute));
        });
    });

    describe('getParam', () => {
        it('false when path length are different', () => {
            // @ts-ignore
            assert.isFalse(RouteService.constructor.getParam(dynamicRoute));
        });
        it('false for static path part is different from location', () => {
            window.history.replaceState({}, 'test', '/bar/7/test/77');
            // @ts-ignore
            assert.isFalse(RouteService.constructor.getParam(dynamicRoute));
        });
        it('false when route path parts are not dynamised', () => {
            window.history.replaceState({}, 'test', '/bar/7/baz/:baz');
            // @ts-ignore
            assert.isFalse(RouteService.constructor.getParam(dynamicRoute));
        });
        it('param when route path parts are dynamised', () => {
            window.history.replaceState({}, 'test', '/bar/7/baz/77');
            // @ts-ignore
            assert.isObject(RouteService.constructor.getParam(dynamicRoute));
        });
    });

});
