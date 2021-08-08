<h1 align="center">Components</h1>

*  [Creation](#creation)
*  [Usage](#usage)
    *  [Encapsulation](#encapsulation)
      *  [Template](#template)
      *  [Hook](#hook)
*  [Router](#router)

___

## Creation

> Components can be generated using the CLI.

*  For global installation

```bash
appable generate component foo
```

*  For local installation using npx

```bash
npx appable generate component foo
```

*  For local installation using script

```bash
npm run appable generate component foo
```

Following files have been generated in "app/foo"

*  foo.component.js
*  foo.component.html
*  foo.component.scss

___

## Usage

> To use your component, route it with the RouterComponent or embed it as a child

*  Template

`Template` use es6 strings, he is updated if an event return a value

```html
<h1>
    ${ counter }
</h1>
<button onclick="increment()">
    Click
</button>
```

*  Component

`Component` have a selector, template and style file

```js
import { Component } from 'appable';

import template from './counter.component.html';

import './counter.component.scss';

export class CounterComponent extends Component {

  counter = 0;

  constructor() {
    super('counter', template);
  }

  increment() {
    return this.counter++;
  }

}
```

You can update programaticly a template

```js
increment() {
  this.counter++;
  this.update();
}
```

*  Style

A scss file is linked to component

```scss
counter {
    background: chocolate;
}
```

### Encapsulation

> Components can embed childs

```js
export class FooComponent extends Component {

  constructor() {
    super('foo', template, [
        new BarComponent,
        new BazComponent,
    ]);
  }

}
```

To display them use child selector in the template

```html
<h1>Foo template</h1>
<div>
    <bar></bar>
    <baz></baz>
</div>
```

You can attach or detach programmaticly child component

```js
const bar = new BarComponent();
this.attach(bar);
this.detach(bar);
```

### Template

> Template use es6 syntax

*  Interpollation

```html
<h1>${ counter }</h1>
```

*  Event binding

Template is updated when an event return a value

```html
<h1 onclick="increment()">Hello</h1>
```

Use Interpollation to provide argument value

```html
<h1 onclick="increment(${ counter })">Hello</h1>
```

*  Conditionnal: use [ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator=operator)

```html
${ increment ? `Incremented` : `` }
```

*  Conditionnal: use [logical operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

```html
${ increment || `Not incremented` }
```

*  Loop: use native [array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Instance_methods) to iterate

```html
${ items.map(item => `
<li>
    ${ item }
</li>
`).join(``)}
```

### Hook

> Lifecycle hooks are triggered for routed components

```js
export class FooComponent extends Component {

    constructor() {
        super('foo'template);
    }

    /**
     * Called after the component is attached
     */
    onInit() { }

    /**
     * Called after the component is displayed
     * 
     * @param {HTMLElement} element Updated element
     */
    onUpdate(element) { }

    /**
     * Called after the component is detached
     */
    onDestroy() { }

    /**
     * Called after the user trigger the back button
     * You can cancel the back navigation by returning false
     * 
     * @returns {Boolean}
     */
    onBack() { }

    /**
     * Called after the user trigger the pause button
     */
    onPause() { }

    /**
     * Called after the user trigger the resume button
     */
    onResume() { }

}
```

___

## Router

> Associate a Component to an url

*  Define routes

src/index.js

```js
RouterComponent
  .add('/foo', 'foo', FooComponent)
  .add('/bar/:id', 'bar', BarComponent)
  .run(new AppComponent)
```

*  Navigate to a component

```js
RouterComponent.navigate('foo');
```

```js
RouterComponent.navigate('bar', { id: 7 });
```

*  Retrieve curent route parameter

```js
const id = RouterComponent.get('id');
```

*  Retrieve curent route

```js
const route = RouterComponent.get();
```

*  Run a component

You can run the component you want but his selector have to be found in the index.html

src/index.html

```html
<html>
<head></head>
<body>
    <!-- Entry point component -->
    <app></app>
    <script src="./dist/app.js"></script>
</body>
</html>
```

Components will be rendered by the `RouterComponent`, `router` tag will be added at the end of the running component by default but he can be declared manually

src/app/app.component.js

```html
Hello app
<main>
    <!-- Router component -->
    <router></router>
</main>
```

By default the first component will be rendered but rewrited URL is allowed and matching component will be routed

___

## ©️ License MIT