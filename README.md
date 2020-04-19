<h1 align="center">hybrid-app</h2>

<p align="center">
hybrid-app is a JavaScript Library for build user interfaces and scale hybrid applications
</p>

<p align="center">
<a href="https://travis-ci.org/seeren/hybrid-app) 
"><img src="https://travis-ci.org/seeren/hybrid-app.svg?branch=master" alt="Build"></a>
<a href="https://coveralls.io/github/seeren/hybrid-app?branch=master"><img src="https://coveralls.io/repos/github/seeren/hybrid-app/badge.svg?branch=master" alt="Coverage"></a>
<a href="https://www.npmjs.com/package/hybrid-app"><img src="https://img.shields.io/npm/dt/hybrid-app.svg" alt="Download"></a>
<a href="https://www.npmjs.com/package/hybrid-app"><img src="https://img.shields.io/npm/v/hybrid-app.svg" alt="Version"></a>
</p>

## 🚀 Create an app

```bash
npm install -g hybrid-app
```

```bash
app new my-app
```

```bash
cd my-app
```

```bash
npm start
```

___

## 📄 Introduction

Hybrid-app is a library for building user interfaces. It provide structured project creation with environment for build on web browser and device. It focus on route, components rendering, services and life cycle hook. The project provide these features with 12 ko of builded code and use native JavaScript syntaxe for template.

___

## 📘 [Documentation](https://github.com/seeren/hybrid-app/wiki/Hybrid-app)

___

## Example

```bash
app generate component foo
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
