### Interpollation

```html
<h1>${ counter}</h1>
```

###Event binding

Template is updated when an event return a value

```html
<h1 onclick="increment()">Hello</h1>
```

```html
<h1 onclick="increment(${ counter})">Hello</h1>
```
### Conditionnal: use [ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator=operator) or [logical operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)

```html
${ increment ? `Incremented` : ``}
```

```html
${ increment || `Not incremented`}
```

### Loop: use native [array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Instance_methods) for iterate

```html
${ items.map((item) => `
<li>
    ${ item}
</li>
`).join(``)}
```