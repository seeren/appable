import { describe, beforeEach, it } from 'mocha';
import { assert } from 'chai';

import { window } from '../window';

import { AppComponent } from '../../src/app/app.component';

describe('AppComponent', () => {

    let component;

    beforeEach(() => { component = new AppComponent(); });

    describe('Selector', () => {
        it('`app` is the selector', () => {
            assert.equal(component.selector, 'app');
        });
    });

});
