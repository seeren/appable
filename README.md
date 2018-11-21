#  💀 babel skeleton

**Build modern JavaScript with productive environment**

[![Build Status](https://travis-ci.org/seeren/babel-skeleton.svg?branch=master)](https://travis-ci.org/seeren/babel-skeleton) [![Coverage Status](https://coveralls.io/repos/github/seeren/babel-skeleton/badge.svg?branch=master)](https://coveralls.io/github/seeren/babel-skeleton?branch=master)
[![Downloads](https://img.shields.io/npm/dt/babel-skeleton.svg)](https://www.npmjs.com/package/babel-skeleton)
[![Release](https://img.shields.io/npm/v/babel-skeleton.svg)](https://www.npmjs.com/package/babel-skeleton)

<img src="ressources/install/install.gif" align="right">

This package is a starter for deal with modern native JavaScript in a productive environment. You can use it for bootstrap a JavaScript web-app, a mobile-app and the environment of development.

The skeleton contain pre configured environment for watch, compile and test source code with continuous integration.

[`Babel`](https://babeljs.io/) [`BrowserSync`](https://browsersync.io/)  [`Chai`](https://www.chaijs.com/) [`Cordova`](https://cordova.apache.org/) [`Coveralls`](https://coveralls.io/) [`HtmlImport`](https://www.npmjs.com/package/babel-plugin-transform-html-import-to-string) [`Istanbul`](https://istanbul.js.org/)  [`Jsdom`](https://www.npmjs.com/package/jsdom)  [`Mocha`](https://mochajs.org/) [`NodeSass`](https://www.npmjs.com/package/node-sass) [`Sinon`](https://sinonjs.org/) [`Travis`](https://travis-ci.org/) [`Webpack`](https://webpack.js.org/)


## 📦 Installation
Install with [npm](https://www.npmjs.com/package/babel-skeleton).

```
npm install -g babel-skeleton
```

## 💀 Usage

<img src="ressources/skeleton/skeleton.jpg" align="right">

Create a new application.

*The command deploy a project skeleton and install the dev environment in a folder for the name given.*
```
skeleton new my-project
```
Move the current directory for be ready to start.
```
cd my-project
```

## 💻 Web browser
Run the application on a Web Browser with [`Webpack`](https://webpack.js.org/) using hot reload with [`BrowserSync`](https://browsersync.io/).
```
npm run start
```

## 📱 Mobile

Install target platform.

*The skeleton is hybrid and provide a [`Cordova`](https://cordova.apache.org/) configuration.*
```
npm run android:install
```
Run the application on installed and detected device.
> [Gradle](https://gradle.org/install/) must be installed and SDK build tool licenses must be accepted: `ANDROID_HOME/tools/bin/sdkmanager --licenses`.
```
npm run android
```

## 👨‍💻  Development

<img src="ressources/demo/demo.gif" align="right">

The demo make the proof of concept of how to wire components, views, shared data and pages together as an usage example.
[Try it](https://seeren.github.io/babel-skeleton/www/index.html) and view the [source code](https://github.com/seeren/babel-skeleton/tree/master/src/app).

The skeleton provide three classes, `Component` for manage dynamic view without DOM manipulation, `Service` for share data with simple notification mechanism and `RouterComponent` for page navigation.

### 💀 **Component**
You can generate components.
```
skeleton generate component my-component
```
A **class** for the given name is generated. Life cycle provide hooks: `onInit` when the component turn on, `onDestroy` when the component turn off, `onUpdate` when the template is updated. A component can be updated manually invoking `update` method.
```js
import { Component } from 'babel-skeleton/component';
import { template } from './app.component.html';

export class AppComponent extends Component {

    constructor() {
        super({
            selector: `my-component`,
            template: template,
            components: []
        });
    }

    onInit() {
        this.title = `Hello`;
    }

    onDestroy() { }

    onUpdate() { }

}
```
A **template** is generated and attached to the component.

*Templates use native es6 interpolation with data binding.*
```html
<h2>${title}</h2>
```
Template have access to the component properties and methods. `Component` trigger `update` if a method return a non empty value when is binded and the event emmitted.
```html
<a onclick="componentMethod()">Hello</a>
```
A **sass file** is generated.
```css
my-component { }
```

### 💀 **Service**
You can generate services.
```
skeleton generate service service-name
```
A **class** for the given name is generated. Services share data between components and `notify` for changes.
```js
export const MyService = new class extends Service {

    constructor() {
        super();
        this.sharedData = [];
    }

    get() {
        return this.sharedData;
    }

    post(data){
        this.sharedData.push(data);
        this.notify();
    }
}
```
Service can `attach` callbacks to trigger when `notify` is called.
```js
MyService.attach(service => this.update())
```

### 💀 **RouterComponent**
You can associate a `Component` and an URL using the `RouterComponent`. The default app declare the router tag, this tag contain the component rendering of the associated URL.
```js
RouterComponent
    .add('/foo', 'foo', FooComponent)
    .add('/bar', 'bar', BarComponent)
    .add('/baz/:id', 'baz', BazComponent)
    .run(new AppComponent)
```
You can trigger components and push URL with `navigate`
```js
RouterComponent.navigate('baz', { id: 7 });
```

## ➰ Integration

<img src="ressources/test/test.jpg" align="right">

The skeleton provide [`Travis`](https://travis-ci.org/) configuration for pass tests and push report to [`Coveralls`](https://coveralls.io/) after a build success.

*Active your project on `Travis` and `Coveralls` for enjoy the feature.*

### ⛏ Test
Pass the tests with [`Mocha`](https://mochajs.org/)
```
npm run test
```
### ☂ Cover
Generate coverage report with [`Istanbul`](https://istanbul.js.org/)
```
npm run coverage
```

## 🔖 Scripts
Following scripts allow you to use the development environment.

| Script | Description |
:---------------|:---------------|
| `npm run start` | Start to dev |
| `npm run skeleton` | Run skeleton cli |
| `npm run dev` | Bundle, run on web browser and watch |
| `npm run prod` | Optimised bundle, run in web browser and watch |
| `npm run build` | Optimised bundle |
| `npm run android` | Run on android device |
| `npm run android:install` | Install android device |
| `npm run ios` | Run on ios device |
| `npm run ios:install` | Install ios device |
| `npm test` | Pass tests recursively |
| `npm run test:coverage` | Test and generate coverage report |
| `npm run test:coveralls` | Cover and send report to coveralls |

## 🔖 Cli
Following commands allow you to generate features.

| Command | Description |
:---------------|:---------------|
| `skeleton new project-name` | Generate a project |
| `skeleton generate component component-name` | Generate a component |
| `skeleton generate service service-name` | Generate a service |

## 🎓 License
[MIT](LICENSE)