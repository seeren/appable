> To use your component, [route it with the RouterComponent](./🚦-Router-usage) or [embed it as a child](./🍰-Component-child)

### Template

Template use es6 strings with access to attributes and methods, he is updated if an event return a value

```html
<h1>
    ${counter}
</h1>
<button onclick="increment()">Click</button>
```

### Component

`Component` have at least a selector, template and style file

```js
import { Component } from 'appable';
import template from './foo.component.html';
import './foo.component.scss';

export class FooComponent extends Component {

  constructor() {
    super({ selector: 'foo', template: template });
    this.counter = 0;
  }

  increment() {
    return this.counter++;
  }

}
```

**You can update programaticly a component template**

```js
increment() {
  this.counter++;
  this.update();
}
```

### Style

A scss file is linked to component

```scss
foo {
    background: chocolate;
}
```