# 💀 babel skeleton

<img  src="resources/install/install.gif"  align="right" width="35%">

*JavaScript project starter for web and mobile with the environment of development*

[![Build Status](https://travis-ci.org/seeren/babel-skeleton.svg?branch=master)](https://travis-ci.org/seeren/babel-skeleton) [![Coverage Status](https://coveralls.io/repos/github/seeren/babel-skeleton/badge.svg?branch=master)](https://coveralls.io/github/seeren/babel-skeleton?branch=master) [![Downloads](https://img.shields.io/npm/dt/babel-skeleton.svg)](https://www.npmjs.com/package/babel-skeleton) [![Release](https://img.shields.io/npm/v/babel-skeleton.svg)](https://www.npmjs.com/package/babel-skeleton)

Using **webpack**, **babel**, **sass** and **cordova** you can generate a **skeleton** ready to build on web-browser and device with **continuous integration**

*Table of content:*
* [Installation](#installation)
* [Usage](#usage): generate a project, build on web browser and device
* [Development](#development): generate components and services
  * [Routing](#routing): associate a component to an URL
  * [Components](#components): display template and childs
  * [Services](#services): share data with notification
___

<a id="installation"></a>

## 📦 Installation

```bash
npm install babel-skeleton
```

<img  src="resources/skeleton/skeleton.jpg"  align="right"  width="35%">

___

<a id="usage"></a>

## 🕹️ Usage

`Create a project`
```bash
./node_modules/.bin/skeleton new my-project
```
```bash
cd my-project
```

### 💻 Web browser

`Run on web browser`
```
npm run start
```

### 📱 Mobile

`Install android`
```bash
npm run android:install
```

`Run on device`
```bash
npm run android:build
```

[Gradle](https://gradle.org/install/) must be installed, device must be detected and [SDK build tools](https://androidsdkmanager.azurewebsites.net/Buildtools) must be installed and licenses must be accepted *(ANDROID_HOME/tools/bin/sdkmanager --licenses)*

### 📜 Scripts

The created project contain following scripts:

| Script | Feature |
:---------------|:---------------|
| npm run start | *Start to dev* |
| npm run skeleton | *Run babel-skeleton for generate component or service* |
| npm run dev | *Build entry points and watch* |
| npm run prod | *Optimise dev* |
| npm run build | *Build* |
| npm run cordova | *Run cordova* |
| npm run res | *Run cordova-res for generate icon and splashscreen* |
| npm run android | *Deploy on device* |
| npm run android:build | *Build and deploy* |
| npm run android:install | *Install android* |
| npm test | *Pass tests* |
| npm run test:coverage | *Generate report* |
| npm run test:coveralls | *Send report to coveralls* |

<img  src="resources/test/test.jpg"  align="right" width="35%">

[Travis](https://travis-ci.org/) configuration is setup for pass tests and push report to [Coveralls](https://coveralls.io/) after a build success

___

<a id="development"></a>

## 👨‍💻 Development

The skeleton provide `Component` for render template, `Service` for share data with notification and `RouterComponent` for navigation and lifecycle

> See [source code](https://github.com/seeren/babel-skeleton/tree/master/demo) of the demo hosted on [GitHub Pages](https://seeren.github.io/babel-skeleton/demo/www/index.html)
### 📜 Scripts

The skeleton contain following scripts:

| Script | Feature |
:---------------|:---------------|
| npm run skeleton new [name] | *Generate a project* |
| npm run skeleton generate component [name] | *Generate a component* |
| npm run skeleton generate service [name] | *Generate a service* |

___

<img  src="resources/demo/demo.gif"  align="right" width="35%">  

<a id="routing"></a>

## 🚦 Routing

**`Associate a Component to an URL`** using the RouterComponent, it will be displayed in the entry point component

> RouterComponent provide lifecycle hook for routed components

*index.js*
```js
import { RouterComponent } from "babel-skeleton";

RouterComponent
  .add('/foo', 'foo', FooComponent)
  .add('/bar/:id', 'bar', BarComponent)
  .run(new AppComponent)
```

By default the first component will be rendered, rewrited URL is allowed and matching component will be routed

*index.html*
```html
<html>
<head></head>
<body>
  <!-- Entry point component -->
  <app></app>
    <script src="./dist/index.js"></script>
</body>
</html>
```

You can run the component you want but his selector have to be found in the index.html

*app.component.html*
```html
Hello app
<!-- Router component -->
<router></router>
```

Routed component will be rendered by the RouterComponent, his tag must exists in the entry point template

### 📑 RouterComponent

> Add a route

| add(`path`, `name`, `component`) |
|:-----------|
| *`Param`* |
| {String} **`path`** Route path |
| {String} **`name`** Route name |
| {Component} **`component`** Component class or instance |
| *`Return`* |
| {RouterComponent} Router instance |
| *`Throw`* |
| {ReferenceError} Path or name exists |

> Run the entry point

| run(`component`) |
|:-----------|
| *`Param`* |
| {Component} **`component`** Component instance |
| *`Return`* |
| {RouterComponent} Router instance |

> Navigate to a Route

| navigate(`name`, `param`= null) |
|:-----------|
| *`Param`* |
| {String} **`name`** Route name |
| {Object} **`param`** Route param |
| *`Throw`* |
| {ReferenceError} Route not found |

> Retrieve the current Route or a Route parameter value

| get(`paramName`= null) |
|:-----------|
| *`Param`* |
| {String} **`paramName`** Route param name |
| *`Return`* |
| {Mixed} Active Route or param name value |
| *`Throw`* |
| {ReferenceError} Route parameter name not found |

<a id="components"></a>

## 🍰 Components

**`Generate a component`**
```bash
./node_modules/.bin/skeleton generate component foo
```

Following files have been generated in *app/foo*:
* foo.component.js
* foo.component.html
* foo.component.scss

`Component` have at least a selector and a template

*foo.component.js*
```js
import { Component } from  'babel-skeleton';
import { template } from  './foo.component.html';

export class FooComponent extends Component {

  constructor() {
    super({ 
        selector: "foo", 
        template: template 
    });
    this.counter = 0;
  }

  increment() {
    return counter++;
  }

}
```

`Template` use ES6 strings with access to attributes and methods

*foo.component.html*
```html
<!-- Interpollate "counter" attribute -->
<h1>${counter}</h1>

<!-- Trigger "increment" method -->
<button onclick="increment()">Click</button>
```
Component is updated if an event handler return a value

`SCSS` file is generated and free to you to import it

*foo.component.scss*
```scss
foo {}
```

`Child Component` can be embeed

*bar.component.js*
```js
import { Component } from  'babel-skeleton';
import { template } from  './bar.component.html';
import { BazComponent } from  './baz/baz.component.html';
import { QuxComponent } from  './qux/qux.component.html';

export class BarComponent extends Component {

  constructor() {
    super({ 
        selector: "bar", 
        template: template,
        components: [
          new BazComponent,
          new QuxComponent,
        ]
    });
  }

}
```

Child component selector have to be found in the template

*bar.component.html*
```html
<baz></baz>
<qux></qux>
```

`Lifecycle hooks` are triggered by the router

*baz.component.js*
```js
import { Component } from  'babel-skeleton';
import { template } from  './baz.component.html';

export class BazComponent extends Component {

    constructor() {
        super({
            selector: "baz", 
            template: template 
        });
    }

    /**
     * Called after the component is attached
     */
    onInit() { }

    /**
     * Called after the component is displayed
     * 
     * @param {HTMLElement} element Updated element
     */
    onUpdate(element) { }

    /**
     * Called after the component is detached
     */
    onDestroy() { }

    /**
     * Called after the user trigger the back button
     * You can cancel the back navigation by returning false
     * 
     * @returns {Boolean}
     */
    onBack() { }

    /**
     * Called after the user trigger the pause button
     */
    onPause() { }

    /**
     * Called after the user trigger the resume button
     */
    onResume() { }

}
```

### 📑 Component

> Update the Component template

| update() |
|:-----------|
| *`Return`* |
| {Component} Component instance |
| *`Throw`* |
| {ReferenceError} Component selector not found |

<a id="services"></a>

## 💫 **Services**

**`Generate a service`**

```bash
./node_modules/.bin/skeleton generate service baz
```

`Service` share data and can notify for changes

*baz.service.js*
```js
import { Service } from  'babel-skeleton';

export const BazService = new  class  extends  Service {

  constructor() {
    super();
    this.data = [];
  }

  post(data){
    this.data.push(data);
    this.notify();
  }

}
```

`Attach` or `detach` callables to trigger when `notify` is called

*baz.component.js*
```js
import { Component } from  'babel-skeleton';
import { template } from  './baz.component.html';
import { BazService } from  './baz.service';

export class BazComponent extends Component {

    constructor() {
        super({ selector: "baz", template: template });
        this.observer = (service) => {
          alert(`BazService has ${service.data.length} items`)
        }
    }

    onInit() { 
      BazService.attach(this.observer);
    }

    onDestroy() { 
      BazService.detach(this.observer);
    }

}
```

### 📑 Service

> Attach a callable triggered when notify is called

| attach(`callable`) |
|:-----------|
| *`Param`* |
| {Function} **`callable`** Function to attach |
| *`Return`* |
| {Service} Service instance |

> Detach a callable

| detach(`callable`) |
|:-----------|
| *`Param`* |
| {Function} **`callable`** Function to attach |
| *`Return`* |
| {Service} Service instance |

> Call all attached callables

| notify() |
|:-----------|
| *`Return`* |
| {Service} Service instance |

___