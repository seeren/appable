import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Route } from '../../../src/models/route.model';

describe('Route', () => {

    const path = '/foo';
    const name = 'foo';
    const component = {};
    const route = new Route(path, name, component);

    describe('path', () => {
        it('Path on first argument', () => {
            assert.equal(route.path, path);
        });
    });

    describe('name', () => {
        it('Name on second argument', () => {
            assert.equal(route.name, name);
        });
    });

    describe('component', () => {
        it('Component on thrid argument', () => {
            assert.equal(route.component, component);
        });
    });

});
