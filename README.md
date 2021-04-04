<h1 align="center">Appable</h1>

<p align="center">
Appable is a Javascript Micro Framework to Build and Scale User Interfaces
</p>

<p align="center">
<a href="https://travis-ci.org/seeren/appable"><img src="https://travis-ci.org/seeren/appable.svg?branch=master" alt="Build"></a>
<a href="https://coveralls.io/github/seeren/appable?branch=master"><img src="https://coveralls.io/repos/github/seeren/appable/badge.svg?branch=master" alt="Coverage"></a>
<a href="https://www.npmjs.com/package/appable"><img src="https://img.shields.io/npm/dt/appable.svg" alt="Download"></a>
<a href="https://www.npmjs.com/package/appable"><img src="https://img.shields.io/npm/v/appable.svg" alt="Version"></a>
<a href="./LICENSE"><img src="https://img.shields.io/npm/l/appable.svg" alt="Version"></a>
<a href="https://www.codacy.com/manual/seeren/appable?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=seeren/appable&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/5de3e97bcbe74350a5a6c47b99b4b735" alt="Build"></a>
</p>

## Installation

```bash
npm install appable
```

```bash
npx appable new my-app
```

```bash
cd my-app
```

```bash
npm start
```

___

## Example

* Generate Component

```bash
appable generate component counter
```

* Interpolate and Bind

`src/app/counter/counter.component.html`

```html
<button onclick="increment()">${ counter }</button>
```

* Use Life Cycle

`src/app/counter/counter.component.js`

```js
import { Component } from "appable";

import template from "./counter.component.html";

export class CounterComponent extends Component {

  constructor() {
    super('counter', template);
  }

  onInit() {
      this.counter = 0;
  }

  increment() {
    return this.counter++;
  }

}
```

* Associate URL

`src/index.js`

```js
RouterComponent
  .add('/count', 'counter', CounterComponent)
  .run(new AppComponent)
```

___

## 📘 Documentation

Read the documentation to learn about build, component, template,service and router usages: [https://github.com/seeren/appable/wiki](https://github.com/seeren/appable/wiki)

___

## ©️ License

[MIT](LICENSE) Copyright Seeren