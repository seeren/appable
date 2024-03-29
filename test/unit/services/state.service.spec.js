import { describe, it } from 'mocha';

import { assert, expect } from 'chai';

import { spy } from 'sinon';

import { window } from '../../window';

import { StateService } from '../../../src/services/state.service';

import { Route } from '../../../src/models/route.model';

describe('StateService', () => {

    global.window = window;

    const historySpy = spy(StateService, 'history');

    const staticRoute = new Route('/foo', 'foo');

    const dynamicRoute = new Route('/bar/:bar/baz/:baz', 'bar');

    const param = { bar: 7, baz: 77 };

    describe('state', () => {
        it('name is null', () => assert.isNull(StateService.get().name));
        it('param is an Object', () => assert.isObject(StateService.get().param));
    });

    describe('get', () =>
        it('retrieve state', () => assert.isObject(StateService.get()))
    );

    describe('post', () =>
        it('call pushState', () => {
            const { callCount } = historySpy;
            StateService.post(staticRoute);
            assert.equal(callCount + 1, historySpy.callCount);
        })
    );

    describe('put', () =>
        it('call pushState', () => {
            const { callCount } = historySpy;
            StateService.put(staticRoute);
            assert.equal(callCount + 1, historySpy.callCount);
        })
    );

    describe('history', () => {
        it('replace at true call history.replaceState', () => assert.isFalse(StateService.history(staticRoute, {}, true)));
        it('replace at false call history.pushState', () => assert.isTrue(StateService.history(staticRoute, {}, false)));
        it('state name is route name', () => {
            StateService.history(dynamicRoute, param);
            assert.equal(StateService.get().name, dynamicRoute.name);
        });
        it('state param is route param', () => {
            StateService.history(dynamicRoute, param);
            assert.equal(StateService.get().param.bar, 7);
        });
        it('location is route path dynamised', () => {
            StateService.history(dynamicRoute, param);
            assert.equal(window.location.pathname, '/bar/7/baz/77');
        });
        it('throw Error for param not found', () => {
            expect(() => StateService.history(dynamicRoute, { bar: 7, baz: 77, qux: 777 }))
                .to.throw('Param "qux" is missing in "/bar/:bar/baz/:baz');
        });
        it('throw Error for missing param', () => {
            expect(() => StateService.history(dynamicRoute, { bar: 7 }))
                .to.throw('Slug ":baz" is missing in param');
        });
    });

});
