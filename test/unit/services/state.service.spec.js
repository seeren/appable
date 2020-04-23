import { describe, it } from 'mocha';
import { assert, expect } from 'chai';
import { window } from '../../window';
import { StateService } from '../../../src/services/state.service';
import { Route } from '../../../src/models/route.model';

describe('StateService', () => {

    describe('state', () => {
        it('name is null', () => {
            assert.isNull(StateService.state.name);
        });
        it('param is an Object', () => {
            assert.isObject(StateService.state.param);
        });
    });

    describe('get', () => {
        it('retrieve state', () => {
            assert.equal(StateService.state, StateService.get());
        });
    });

    describe('history', () => {
        const staticRoute = new Route('/foo', 'foo');
        const dynamicRoute = new Route('/bar/:bar/baz/:baz', 'bar');
        const param = { bar: 7, baz: 77 };
        it('replace at true call history.replaceState', () => {
            assert.isFalse(StateService.history(staticRoute, {}, true));
        });
        it('replace at false call history.pushState', () => {
            assert.isTrue(StateService.history(staticRoute, {}, false));
        });
        it('state name is route name', () => {
            StateService.history(dynamicRoute, param);
            assert.equal(StateService.state.name, dynamicRoute.name);
        });
        it('state param is route param', () => {
            StateService.history(dynamicRoute, param);
            assert.equal(StateService.state.param.bar, 7);
        });
        it('location is route path dynamised', () => {
            StateService.history(dynamicRoute, param);
            assert.equal(window.location.pathname, '/bar/7/baz/77');
        });
        it('Throw Error for param not found', () => {
            expect(() => {
                StateService.history(dynamicRoute, { bar: 7, baz: 77, qux: 777 });
            }).to.throw(
                'Navigation param "qux" not found in "/bar/:bar/baz/:baz',
            );
        });
        it('Throw Error for missing param', () => {
            expect(() => {
                StateService.history(dynamicRoute, { bar: 7 });
            }).to.throw(
                'Navigation route part ":baz" missing in param',
            );
        });

    });

});
