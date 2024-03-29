import { describe, beforeEach, it } from 'mocha';

import { assert, expect } from 'chai';

import { spy } from 'sinon';

import { window } from '../../window';

import { Component } from '../../../src/components/component';

describe('Component', () => {

    global.window = window;

    let appComponent = null;

    let fooComponent = null;

    beforeEach(() => {
        appComponent = new Component('app');
        fooComponent = new Component('foo');
    });

    describe('constructor', () => {
        it('selector is option selector', () => assert.equal(appComponent.selector, 'app'));
        it('template is option template', () => assert.equal((new Component('app', 'Hello')).template, 'Hello'));
        it('components is an array', () => assert.isArray(appComponent.components));
        it('components are attached', () => assert.equal(1, (new Component('app', '', [new Component('foo')],)).row,));
    });

    describe('attach', () => {
        it('throw ReferenceError for already attached', () => {
            appComponent.attach(fooComponent);
            expect(() => appComponent.attach(fooComponent)).to.throw('Can\'t attach "foo": is already attached');
        });
        it('add "data-{selector}={row}" on component tag', () => {
            appComponent.template = 'Hello<foo class="test"></foo>World';
            appComponent.attach(fooComponent);
            assert.equal('Hello<foo class="test" data-app="0"></foo>World', appComponent.template);
        });
        it('add component tag at the template end when not found', () => {
            appComponent.attach(fooComponent);
            assert.equal('<foo data-app="0"></foo>', appComponent.template);
        });
        it('add component to components collection', () => {
            const componentLength = appComponent.components.length;
            appComponent.attach(fooComponent);
            assert.equal(componentLength + 1, appComponent.components.length);
        });
        it('increment row', () => {
            appComponent.attach(fooComponent);
            appComponent.attach(new Component('bar'));
            assert.equal(2, appComponent.row);
            assert.equal('<foo data-app="0"></foo><bar data-app="1"></bar>', appComponent.template);
        });
        it('call component emit for "onInit"', () => {
            const lifCycleSpy = spy(fooComponent, 'emit');
            appComponent.attach(fooComponent);
            assert.isTrue(lifCycleSpy.calledWith('onInit'));
        });
    });

    describe('detach', () => {
        it('Throw ReferenceError for not attached', () =>
            expect(() => appComponent.detach(fooComponent)).to.throw('Can\'t detach "foo": is not attached')
        );
        it('remove component tag from template', () => {
            appComponent.template = 'Hello<foo class="test"></foo>World';
            appComponent.attach(fooComponent);
            appComponent.detach(fooComponent);
            assert.equal(appComponent.template, 'HelloWorld');
        });
        it('decrement row', () => {
            appComponent.attach(fooComponent);
            const { row } = appComponent;
            appComponent.detach(fooComponent);
            assert.equal(row - 1, appComponent.row);
        });
        it('call component emit for "onDestroy"', () => {
            const lifCycleSpy = spy(fooComponent, 'emit');
            appComponent.attach(fooComponent);
            appComponent.detach(fooComponent);
            assert.isTrue(lifCycleSpy.calledWith('onDestroy'));
        });
    });

    describe('emit', () => {
        it('call hook when exists', () => {
            appComponent.onInit = () => { };
            const onInitSpy = spy(appComponent, 'onInit');
            appComponent.emit('onInit');
            assert.equal(1, onInitSpy.callCount);
        });
        it('call components hook', () => {
            fooComponent.onInit = () => { };
            appComponent.attach(fooComponent);
            const onInitSpy = spy(fooComponent, 'onInit');
            appComponent.emit('onInit');
            assert.equal(1, onInitSpy.callCount);
        });
        it('return false when is present', () => {
            appComponent.onInit = () => false;
            fooComponent.onInit = () => true;
            appComponent.attach(fooComponent);
            assert.isFalse(appComponent.emit('onInit'));
        });
        it('return components hook while not false', () => {
            appComponent.onInit = () => true;
            fooComponent.onInit = () => false;
            appComponent.attach(fooComponent);
            assert.isFalse(appComponent.emit('onInit'));
        });
    });

    describe('registerEvent', () => {

        let element = null;

        beforeEach(() => element = window.document.createElement('p'));

        it('affect callable to property', () => {
            appComponent.registerEvent(element, 'onclick', 'callable', {});
            assert.isFunction(element.onclick);
        });
        it('HTLMElement property rely to component method', () => {
            let called = false;
            appComponent.callable = () => called = true;
            appComponent.registerEvent(element, 'onclick', 'callable', []);
            element.onclick();
            assert.isTrue(called);
        });
        it('parameters are re-based on type', () => {
            let value = null;
            appComponent.callable = (foo) => value = foo;
            appComponent.registerEvent(element, 'onclick', 'callable', ['"foo"']);
            element.onclick();
            assert.equal(value, 'foo');
        });
        it('call update when method return a value', () => {
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
        it('call register event when method found in template', () => {
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
        it('throw ReferenceError for selector not found', () => expect(() => assert.equal(appComponent.update(), appComponent)));
        it('dynamize element for selector template', () => {
            const element = window.document.createElement('app');
            window.document.body.innerHTML = '';
            window.document.body.appendChild(element);
            appComponent.message = 'World';
            appComponent.template = 'Hello ${message}';
            appComponent.update();
            assert.equal('Hello World', element.innerHTML);
        });
        it('call update event for own methods', () => {
            const updateEventsSpy = spy(appComponent, 'updateEvents');
            const element = window.document.createElement('app');
            window.document.body.innerHTML = '';
            window.document.body.appendChild(element);
            appComponent.onInit = () => { };
            appComponent.onFoo = () => { };
            appComponent.update();
            assert.equal(1, updateEventsSpy.callCount);
        });
        it('call component emit for "onUpdate"', () => {
            appComponent.onUpdate = () => { };
            const lifCycleSpy = spy(appComponent, 'onUpdate');
            appComponent.update();
            assert.equal(1, lifCycleSpy.callCount);
        });
        it('call components update', () => {
            fooComponent.onUpdate = () => { };
            const lifCycleSpy = spy(fooComponent, 'update');
            appComponent.attach(fooComponent);
            appComponent.update();
            assert.equal(1, lifCycleSpy.callCount);
        });
    });

});
