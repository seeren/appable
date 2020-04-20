<h1 align="center">Appable</h2>

<p align="center">
Appable is a JavaScript Library for build user interfaces and scale web application effectively
</p>

<p align="center">
<a href="https://travis-ci.org/seeren/appable"><img src="https://travis-ci.org/seeren/appable.svg?branch=master" alt="Build"></a>
<a href="https://coveralls.io/github/seeren/appable?branch=master"><img src="https://coveralls.io/repos/github/seeren/appable/badge.svg?branch=master" alt="Coverage"></a>
<a href="https://www.npmjs.com/package/appable"><img src="https://img.shields.io/npm/dt/appable.svg" alt="Download"></a>
<a href="https://www.npmjs.com/package/appable"><img src="https://img.shields.io/npm/v/appable.svg" alt="Version"></a>
<a href="./LICENSE"><img src="https://img.shields.io/npm/l/appable.svg" alt="Version"></a>
<a href="https://www.codacy.com/manual/seeren/appable?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=seeren/appable&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/5de3e97bcbe74350a5a6c47b99b4b735" alt="Build"></a>
</p>

## 📦 Create an app

```bash
npm install -g appable
```

```bash
appable new my-app
```

```bash
cd my-app
```

```bash
npm start
```

___

## 📄 Introduction

Appable focus on project creation, components rendering, routing, services and life cycle hooks with environment for build on web browser and device. The package provide these features with 12 ko of builded code and use native JavaScript syntaxe.

___

## 📘 Documentation

*   [Project](https://github.com/seeren/appable/wiki/📦-Creation)
*   [Router](https://github.com/seeren/appable/wiki/🚦-Router-usage)
*   [Component](https://github.com/seeren/appable/wiki/🍰-Component-creation)
*   [Service](https://github.com/seeren/appable/wiki/💫-Service-creation)
*   [Scripts](https://github.com/seeren/appable/wiki/📜-Scripts)

___

## 🖊️ Example

*Generate a component*

```bash
appable generate component counter
```

*Associate an url*

```js
RouterComponent
  .add('/count', 'counter', CounterComponent)
  .run(new AppComponent)
```

*Interpolate and bind event*

```html
<button onclick="increment()">${counter}</button>
```

*Handle interaction*

```js
export class CounterComponent extends Component {

  constructor() {
    super({ selector: "foo", template });
  }

  onInit() {
      this.counter = 0;
  }

  increment() {
    return this.counter++;
  }

}
```

___

You can fast add feature to the app, check the [documentation](https://github.com/seeren/appable/wiki) to read about build, shared service, router and component details.

___

## ©️ License

[MIT](LICENSE) Copyright 2020 Seeren