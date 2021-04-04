import { describe, beforeEach, it } from 'mocha';

import { assert } from 'chai';

import { Service } from '../../../src/services/service';

describe('Service', () => {

    let service;

    let called = null;

    let callable = null;

    beforeEach(() => {
        service = new Service();
        called = 0;
        callable = () => called += 1;
    });

    describe('notify', () =>
        it('call attached callables', () => {
            service.attach(callable).notify();
            assert.equal(1, called);
        })
    );

    describe('attach', () =>
        it('add callable', () => {
            service.attach(callable).attach(callable).notify();
            assert.equal(called, 2);
        })
    );

    describe('detach', () =>
        it('remove callable', () => {
            service.attach(callable).detach(callable).notify();
            assert.equal(0, called)
        })
    );

});
