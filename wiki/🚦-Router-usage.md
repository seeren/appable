<img  src="https://user-images.githubusercontent.com/17710028/78450375-70e16d00-767e-11ea-9bda-8a297aac2395.gif"  align="right" width="35%">  

### Associate a Component to an url

**index.js**

```js
RouterComponent
  .add('/foo', 'foo', FooComponent)
  .add('/bar/:id', 'bar', BarComponent)
  .run(new AppComponent)
```

### Navigate to a component

```js
RouterComponent.navigate('foo');
```

```js
RouterComponent.navigate('bar', { id: 7 });
```

### Retrieve curent route parameter

```js
const id = RouterComponent.get('id');
```
### Retrieve curent route

```js
const route = RouterComponent.get();
```

### Run a component

You can run the component you want but his selector have to be found in the index.html

**www/index.html**

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

Components will be rendered by the RouterComponent, `router` tag will be added at the end of the running component by default but he can be declared manually

**src/app.component.js**

```html
Hello app
<main>
    <!-- Router component -->
    <router></router>
</main>
```

___

By default the first component will be rendered but rewrited URL is allowed and matching component will be routed