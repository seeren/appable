import { describe, before, beforeEach, after, afterEach, it } from 'mocha';
import { assert, expect , timeout} from 'chai';
import sinon from 'sinon';
import { window } from './../../../window';
import { Demo } from './../../../../src/demo/demo.component';

describe('Demo', () => {

    let demo;

    before(() => {
        demo = sinon.mock(new Demo);
    });

    describe('Methods', () => {
        it('has a constructor', () => assert.isFunction(demo.constructor));
    });

});