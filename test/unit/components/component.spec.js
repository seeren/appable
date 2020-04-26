import { describe, beforeEach, it } from 'mocha';
import { assert, expect } from 'chai';
import { spy } from 'sinon';
import { window } from '../../window';
import { Component } from '../../../src/components/component';

describe('Component', () => {

    let appComponent = null;
    let fooComponent = null;

    beforeEach(() => {
        appComponent = new Component({ selector: 'app', template: '' });
        fooComponent = new Component({ selector: 'foo', template: '' });
    });

    describe('constructor', () => {
        it('selector is option selector', () => {
            assert.equal(appComponent.selector, 'app');
        });
        it('template is option template', () => {
            appComponent.template = 'Hello';
            assert.equal(appComponent.template, 'Hello');
        });
        it('components is an array', () => {
            assert.isArray(appComponent.components);
        });
    });

    describe('attach', () => {
        it('Throw ReferenceError for already attached', () => {
            appComponent.attach(fooComponent);
            expect(() => { appComponent.attach(fooComponent); }).to.throw(
                'Can\'t attach "foo": instance already exist',
            );
        });
        it('Add data-{selector}={row} on component tag', () => {
            appComponent.template = 'Hello<foo class="test"></foo>World';
            appComponent.attach(fooComponent);
            assert.equal(
                'Hello<foo class="test" data-app="0"></foo>World',
                appComponent.template,
            );
        });
        it('Add component tag at the template end when not found', () => {
            appComponent.attach(fooComponent);
            assert.equal('<foo data-app="0"></foo>', appComponent.template);
        });
        it('Add component to components collection', () => {
            const componentLength = appComponent.components.length;
            appComponent.attach(fooComponent);
            assert.equal(componentLength + 1, appComponent.components.length);
        });
        it('Increment row', () => {
            appComponent.attach(fooComponent);
            appComponent.attach(new Component({ selector: 'bar', template: '' }));
            assert.equal(2, appComponent.row);
            assert.equal(
                '<foo data-app="0"></foo><bar data-app="1"></bar>',
                appComponent.template,
            );
        });
        it('Call component lifeCycle for "onInit"', () => {
            const lifCycleSpy = spy(fooComponent, 'lifeCycle');
            appComponent.attach(fooComponent);
            assert.isTrue(lifCycleSpy.calledWith('onInit'));
        });
    });

    describe('detach', () => {
        it('Throw ReferenceError for not attached', () => {
            expect(() => { appComponent.detach(fooComponent); }).to.throw(
                'Can\'t detach "foo": make sure you attach it before',
            );
        });
        it('Remove component tag from template', () => {
            appComponent.template = 'Hello<foo class="test"></foo>World';
            appComponent.attach(fooComponent);
            appComponent.detach(fooComponent);
            assert.equal(appComponent.template, 'HelloWorld');
        });
        it('Decrement row', () => {
            appComponent.attach(fooComponent);
            const { row } = appComponent;
            appComponent.detach(fooComponent);
            assert.equal(row - 1, appComponent.row);
        });

        it('Call component lifeCycle for "onDestroy"', () => {
            const lifCycleSpy = spy(fooComponent, 'lifeCycle');
            appComponent.attach(fooComponent);
            appComponent.detach(fooComponent);
            assert.isTrue(lifCycleSpy.calledWith('onDestroy'));
        });
    });

    describe('lifeCycle', () => {
        it('Call hook when exists', () => {
            appComponent.onInit = () => {};
            const onInitSpy = spy(appComponent, 'onInit');
            appComponent.lifeCycle('onInit');
            assert.equal(1, onInitSpy.callCount);
        });
        it('Call components hook', () => {
            fooComponent.onInit = () => {};
            appComponent.attach(fooComponent);
            const onInitSpy = spy(fooComponent, 'onInit');
            appComponent.lifeCycle('onInit');
            assert.equal(1, onInitSpy.callCount);
        });
        it('Return false when is present', () => {
            appComponent.onInit = () => false;
            fooComponent.onInit = () => true;
            appComponent.attach(fooComponent);
            assert.isFalse(appComponent.lifeCycle('onInit'));
        });
        it('Return components hook while not false', () => {
            appComponent.onInit = () => true;
            fooComponent.onInit = () => false;
            appComponent.attach(fooComponent);
            assert.isFalse(appComponent.lifeCycle('onInit'));
        });
    });


    describe('registerEvent', () => {
        let element = null;

        beforeEach(() => {
            element = window.document.createElement('p');
        });

        it('Affect callable to property', () => {
            appComponent.registerEvent(element, 'onclick', 'callable', {});
            assert.isFunction(element.onclick);
        });
        it('HTLMElement property rely to component method', () => {
            let called = false;
            appComponent.callable = () => { called = true; };
            appComponent.registerEvent(element, 'onclick', 'callable', []);
            element.onclick();
            assert.isTrue(called);
        });
        it('Parameters are re-based on type', () => {
            let value = null;
            appComponent.callable = (foo) => { value = foo; };
            appComponent.registerEvent(element, 'onclick', 'callable', ['"foo"']);
            element.onclick();
            assert.equal(value, 'foo');
        });
        it('Call update when method return a value', () => {
            const updateSpy = spy(appComponent, 'update');
            window.document.body.innerHTML = '<app></app>';
            appComponent.callable = () => true;
            appComponent.registerEvent(element, 'onclick', 'callable', []);
            element.onclick();
            window.document.body.innerHTML = '';
            assert.equal(1, updateSpy.callCount);
        });
    });

    describe('updateEvents', () => {
        it('Call register event when method found in template', () => {
            const registerEventSpy = spy(appComponent, 'registerEvent');
            const element = window.document.createElement('app');
            appComponent.callable = () => true;
            window.document.body.innerHTML = '';
            window.document.body.appendChild(element);
            element.innerHTML = '<a onclick="callable()"></a>';
            appComponent.updateEvents(element, ['callable']);
            window.document.body.innerHTML = '';
            assert.equal(1, registerEventSpy.callCount);
        });
    });

    describe('update', () => {
        it('Throw ReferenceError for selector not found', () => {
            expect(() => { appComponent.update(); }).to.throw(
                'Can\'t find "app" selector in the document',
            );
        });
        it('Dynamize element for selector template', () => {
            const element = window.document.createElement('app');
            window.document.body.innerHTML = '';
            window.document.body.appendChild(element);
            appComponent.message = 'World';
            // eslint-disable-next-line no-template-curly-in-string
            appComponent.template = 'Hello ${message}';
            appComponent.update();
            assert.equal('Hello World', element.innerHTML);
        });
        it('Call update event for own methods', () => {
            const updateEventsSpy = spy(appComponent, 'updateEvents');
            const element = window.document.createElement('app');
            window.document.body.innerHTML = '';
            window.document.body.appendChild(element);
            appComponent.onInit = () => {};
            appComponent.onFoo = () => {};
            // eslint-disable-next-line no-template-curly-in-string
            appComponent.update();
            assert.equal(1, updateEventsSpy.callCount);
        });
    });

});
