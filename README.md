<h1 align="center">Appable</h2>

<p align="center">
Appable is JavaScript Library for building user interfaces and scale them effectively
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
npm install -g appable

appable new my-app

cd my-app

npm start
```

___

## Introduction

**Building**: create, build and test app on web and mobile.

**User Interface**: generate views with data interpollation, event binding, hooks and auto rendering.

**Scale**: encapsulate components, share data with services and associate url.

___

## Example

Generate a component

```bash
appable generate component counter
```

**counter.component.html**

*Template is auto rendering, use interpolation and event binding*

```html
<button onclick="increment()">${counter}</button>
```

**counter.component.js**

*Component handle interaction, data and use life cycle*

```js
export class CounterComponent extends Component {

  constructor() {
    super({ selector: "counter", template });
  }

  onInit() {
      this.counter = 0;
  }

  increment() {
    return this.counter++;
  }

}
```

**index.js**

*Associate component to url*

```js
RouterComponent
  .add('/count', 'counter', CounterComponent)
  .run(new AppComponent)
```
___

## 📘 [Documentation](https://github.com/seeren/appable/wiki/)

Read the [documentation](https://github.com/seeren/appable/wiki) to learn about build, component encapsulation, service, router and other details.

___

## ©️ License

[MIT](LICENSE) Copyright 2020 Seeren