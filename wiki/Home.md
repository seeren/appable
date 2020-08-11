# Appable

Appable is JavaScript Library for building user interfaces and scale them effectively 

## Getting started

* Install appable

```bash
npm install -g appable
```

* Create a new app

```bash
appable new my-app
cd my-app
```

* Run the app

```bash
npm start
```

* Generate a component

```js
appable generate component counter
```

* Route the component

**src/index.js**

```js
RouterComponent
  .add('/count', 'counter', CounterComponent)
  .run(new AppComponent)
```