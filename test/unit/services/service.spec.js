import { describe, beforeEach, it } from 'mocha';
import { assert } from 'chai';
import { Service } from '../../../src/services/service';

describe('Service', () => {

    let service;

    beforeEach(() => { service = new Service(); });

    describe('notify', () => {
        it('call attached callables', () => {
            let called = false;
            const callable = () => { called = true; };
            service.attach(callable);
            service.notify();
            assert.isTrue(called);
        });
    });

    describe('attach', () => {
        it('Add callable', () => {
            let called = 0;
            const callable = () => { called += 1; };
            service.attach(callable);
            service.attach(callable);
            service.notify();
            assert.equal(called, 2);
        });
    });

    describe('detach', () => {
        it('Remove callable', () => {
            let called = false;
            const callable = () => { called = true; };
            service.attach(callable);
            service.detach(callable);
            service.notify();
            assert.isFalse(called);
        });
    });

});
