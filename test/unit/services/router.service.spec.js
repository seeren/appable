import { describe, it } from 'mocha';
import { assert, expect } from 'chai';
import { spy } from 'sinon';
import { window } from '../../window';
import { RouterService } from '../../../src/services/state.service';
import { Route } from '../../../src/models/route.model';

describe('RouterService', () => {

    // @ts-ignore
    const historySpy = spy(RouterService, 'history');
    // @ts-ignore
    const staticRoute = new Route('/foo', 'foo');
    // @ts-ignore
    const dynamicRoute = new Route('/bar/:bar/baz/:baz', 'bar');
    const param = { bar: 7, baz: 77 };

    describe('state', () => {
        it('name is null', () => assert.isNull(RouterService.state.name));
        it('param is an Object', () => assert.isObject(RouterService.state.param));
    });

    describe('get', () => {
        it('retrieve state', () => assert.equal(
            RouterService.state,
            RouterService.get(),
        ));
    });

    describe('post', () => {
        it('call pushState', () => {
            const { callCount } = historySpy;
            RouterService.post(staticRoute);
            assert.equal(callCount + 1, historySpy.callCount);
        });
    });

    describe('put', () => {
        it('call pushState', () => {
            const { callCount } = historySpy;
            RouterService.put(staticRoute);
            assert.equal(callCount + 1, historySpy.callCount);
        });
    });

    describe('history', () => {
        it('replace at true call history.replaceState', () => {
            // @ts-ignore
            assert.isFalse(RouterService.history(staticRoute, {}, true));
        });
        it('replace at false call history.pushState', () => {
            // @ts-ignore
            assert.isTrue(RouterService.history(staticRoute, {}, false));
        });
        it('state name is route name', () => {
            // @ts-ignore
            RouterService.history(dynamicRoute, param);
            assert.equal(RouterService.state.name, dynamicRoute.name);
        });
        it('state param is route param', () => {
            // @ts-ignore
            RouterService.history(dynamicRoute, param);
            assert.equal(RouterService.state.param.bar, 7);
        });
        it('location is route path dynamised', () => {
            // @ts-ignore
            RouterService.history(dynamicRoute, param);
            assert.equal(window.location.pathname, '/bar/7/baz/77');
        });
        it('throw Error for param not found', () => {
            // @ts-ignore
            expect(() => RouterService.history(
                dynamicRoute,
                { bar: 7, baz: 77, qux: 777 },
            )).to.throw(
                'Param "qux" is missing in "/bar/:bar/baz/:baz',
            );
        });
        it('throw Error for missing param', () => {
            // @ts-ignore
            expect(() => RouterService.history(
                dynamicRoute,
                { bar: 7 },
            )).to.throw(
                'Slug ":baz" is missing in param',
            );
        });
    });

});
