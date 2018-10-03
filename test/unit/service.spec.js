import { describe, beforeEach, it } from 'mocha';
import { assert } from 'chai';
import { Service } from './../../src/service';

describe('Service', () => {

    var service;

    beforeEach(() => service = new Service);

    describe('notify', () => {
        it('call attached callback', () => {
            let called = false;
            let callable = () => called = true;
            service.attach(callable);
            service.notify();
            assert.isTrue(called)
        });
    });

    describe('attach', () => {
        it('Allow collection', () => {
            let called = 0;
            let callable = () => called++;
            service.attach(callable);
            service.attach(callable);
            service.notify();
            assert.equal(called, 2)
        });
    });

    describe('detach', () => {
        it('Remove attached', () => {
            let called = false;
            let callable = () => called = true;
            service.attach(callable);
            service.detach(callable);
            service.notify();
            assert.isFalse(called)
        });
    });

});