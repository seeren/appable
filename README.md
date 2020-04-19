<h1 align="center">Appable</h2>

<p align="center">
Appable is a JavaScript Library for create then scale front application effectively.
</p>

<p align="center">
<a href="https://travis-ci.org/seeren/appable) 
"><img src="https://travis-ci.org/seeren/appable.svg?branch=master" alt="Build"></a>
<a href="https://coveralls.io/github/seeren/appable?branch=master"><img src="https://coveralls.io/repos/github/seeren/appable/badge.svg?branch=master" alt="Coverage"></a>
<a href="https://www.npmjs.com/package/appable"><img src="https://img.shields.io/npm/dt/appable.svg" alt="Download"></a>
<a href="https://www.npmjs.com/package/appable"><img src="https://img.shields.io/npm/v/appable.svg" alt="Version"></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/appable"><img src="https://nodei.co/npm/appable.png" alt="Version"></a>
</p>

## 🚀 Create an app


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

Appable is a library for building user interfaces. It provide project creation with environment for build on web browser and device. It focus on components rendering, route, services and life cycle hooks. The package provide these features with 12 ko of builded code and use native JavaScript syntaxe.

___

## 📘 [Documentation](https://github.com/seeren/appable/wiki/appable)

___

## Example

```bash
appable generate component foo
```

```js
RouterComponent
  .add('/', 'foo', FooComponent)
  .run(new AppComponent)
```

```html
<p onclick="hello()">${title}</p>
```

```js
export class FooComponent extends Component {

    constructor() {
        super({ selector: "foo", template: template });
    }

    onInit() {
      this.title = "Click Me";
    }

    hello() {
        return this.title = "Hello World";
    }

}
```

```scss
foo { background: chocolate }
```

___

## ©️ License

[MIT](LICENSE) Copyright 2020 Seeren