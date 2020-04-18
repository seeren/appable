<h1 align="center">app-js</h2>

<p align="center">
App-js is a JavaScript Library for build user interfaces and scale web applications
</p>

<p align="center">
<a href="https://travis-ci.org/seeren/app-js) 
"><img src="https://travis-ci.org/seeren/app-js.svg?branch=master" alt="Build"></a>
<a href="https://coveralls.io/github/seeren/app-js?branch=master"><img src="https://coveralls.io/repos/github/seeren/app-js/badge.svg?branch=master" alt="Coverage"></a>
<a href="https://www.npmjs.com/package/app-js"><img src="https://img.shields.io/npm/dt/app-js.svg" alt="Download"></a>
<a href="https://www.npmjs.com/package/app-js"><img src="https://img.shields.io/npm/v/app-js.svg" alt="Version"></a>
</p>

## Create an app

```bash
npm install -g app-js
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

App-js is a library for building user interfaces. It provide structured project creation with environment for build on web browser and device. It focus on route, components rendering, services and life cycle hook. The project provide these features with 12 ko of builded code and use native JavaScript syntaxe for template.

___

##  [Documentation](https://github.com/seeren/app-js/wiki/App-js)

___

## 🌱 Example

```bash
app generate component foo
```

```js
RouterComponent
  .add('/', 'foo', FooComponent)
  .run(new AppComponent)
```

```html
<p onclick="hello()">
  ${title}
</p>
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
