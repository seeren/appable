#  💀 babel skeleton

<img src="ressources/install/install.gif" align="right">

**Build modern JavaScript with productive environment**

[![Build Status](https://travis-ci.org/seeren/babel-skeleton.svg?branch=master)](https://travis-ci.org/seeren/babel-skeleton) [![Coverage Status](https://coveralls.io/repos/github/seeren/babel-skeleton/badge.svg?branch=master)](https://coveralls.io/github/seeren/babel-skeleton?branch=master)
[![Downloads](https://img.shields.io/npm/dt/babel-skeleton.svg)](https://www.npmjs.com/package/babel-skeleton)
[![Release](https://img.shields.io/npm/v/babel-skeleton.svg)](https://www.npmjs.com/package/babel-skeleton)


This package is a starter for deal with modern JavaScript in a productive environment. You can use this starter for bootstrap a JavaScript hybrid-app and the environment of development for watch, compile and test source code with continuous integration.

[`Babel`](https://babeljs.io/) [`BrowserSync`](https://browsersync.io/)  [`Chai`](https://www.chaijs.com/) [`Cordova`](https://cordova.apache.org/) [`Coveralls`](https://coveralls.io/) [`HtmlImport`](https://www.npmjs.com/package/babel-plugin-transform-html-import-to-string) [`Istanbul`](https://istanbul.js.org/)  [`Jsdom`](https://www.npmjs.com/package/jsdom)  [`Mocha`](https://mochajs.org/) [`NodeSass`](https://www.npmjs.com/package/node-sass) [`Sinon`](https://sinonjs.org/) [`Travis`](https://travis-ci.org/) [`Webpack`](https://webpack.js.org/)


## 📦 Installation

<img src="ressources/skeleton/skeleton.jpg" align="right">

Install with [npm](https://www.npmjs.com/package/babel-skeleton).

```
npm install -g babel-skeleton
```

Create a new application.

```
skeleton new my-project
```
Move the current directory.
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

```
npm run android:install
```
Run the application on installed and detected device.
```
npm run android
```
[Gradle](https://gradle.org/install/) must be installed and SDK build tool licenses must be accepted: `ANDROID_HOME/tools/bin/sdkmanager --licenses`.

## 👨‍💻  Development

<img src="ressources/demo/demo.gif" align="right">

The skeleton provide `Component` for manage dynamic view, `Service` for share data with simple notification mechanism and `RouterComponent` for page navigation. [Try it](https://seeren.github.io/babel-skeleton/www/index.html) and view the [source code](https://github.com/seeren/babel-skeleton/tree/master/demo).

### 🍰 **Component**
You can generate components.
```
skeleton generate component my-component
```
Life cycle provide hooks: `onInit` when the component turn on, `onDestroy` when the component turn off, `onUpdate` when the template is updated. A component can be updated manually invoking `update` method.
```js
import { Component } from 'babel-skeleton';
import { template } from './app.component.html';

export class AppComponent extends Component {

    constructor() {
        super({
            selector: `my-component`,
            template: template
        });
    }

    onInit() {
        this.title = `Hello`;
    }

    onDestroy() { }

    onUpdate() { }

}
```
A **template** with data binding is generated and attached to the component.

```html
<h2>${title}</h2>
```
Template have access to the component properties and methods. `Component` trigger `update` if an event handler return a value.
```html
<a onclick="componentMethod()">Hello</a>
```
A **sass** file is generated.
```css
my-component { }
```

### 💫 **Service**
You can generate services.
```
skeleton generate service service-name
```
Services share data between components and `notify` for changes.
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

### 🚦 **RouterComponent**
You can associate a `Component` and an URL using the `RouterComponent`.
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
### 🚥 **RouterService**
You can be notified when a navigation append.
```js
RouterService.attach((service) => `Navigate to ${service.get().name}`);
```

## ➰ Integration

<img src="ressources/test/test.jpg" align="right">

The skeleton provide [`Travis`](https://travis-ci.org/) configuration for pass tests and push report to [`Coveralls`](https://coveralls.io/) after a build success. 

Pass the tests with [`Mocha`](https://mochajs.org/).
```js
npm run test
```
Generate coverage report with [`Istanbul`](https://istanbul.js.org/).
```js
npm run coverage
```

## 🔖 Scripts

Following scripts allow you to use the development environment.

| Script | Description |
:---------------|:---------------|
| `npm run start` | Start to dev |
| `npm run skeleton` | Run cli |
| `npm run dev` | Run and watch |
| `npm run prod` | Optimised dev |
| `npm run build` | Bundle |
| `npm run android` | Deploy on device |
| `npm run android:build` | Bundle and deploy |
| `npm run android:install` | Install platform |
| `npm run ios` | Deploy on device |
| `npm run ios:install` | Install platform |
| `npm test` | Pass tests |
| `npm run test:coverage` | Generate report |
| `npm run test:coveralls` | Send report |

## 🔖 Cli
Following commands allow you to generate features.

| Command | Description |
:---------------|:---------------|
| `skeleton new project-name` | Generate a project |
| `skeleton generate component component-name` | Generate a component |
| `skeleton generate service service-name` | Generate a service |

## 🎓 License
This project is under [MIT](LICENSE) license.