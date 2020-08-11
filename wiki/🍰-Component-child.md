Components can embed childs

```js
export class FooComponent extends Component {

  constructor() {
    super({ selector: 'foo', template: template, components: [
          new BarComponent,
          new BazComponent,
        ]
    });
  }

}
```

For display them, nothing to do, they will be added at the end of the template by default. You can also control their position

```html
<h1>Foo template</h1>
<div>
    <bar></bar>
    <baz></baz>
</div>
```

**You can attach or detach programmaticly child component**

```js
const bar = new BarComponent();
this.attach(bar);
this.detach(bar);
```