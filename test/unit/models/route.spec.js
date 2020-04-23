import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Route } from '../../../src/models/route.model';

describe('Route', () => {

    describe('path', () => {
        it('Path on first argument', () => {
            const name = 'foo';
            assert.equal(new Route(name).path, name);
        });
    });

    describe('name', () => {
        it('Name on second argument', () => {
            const name = 'foo';
            assert.equal(new Route('', name).name, name);
        });
    });


    describe('component', () => {
        it('Component on thrid argument', () => {
            const component = {};
            assert.equal(new Route('', '', component).component, component);
        });
    });

});
