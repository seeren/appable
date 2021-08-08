<h1 align="center">Services</h1>

-   [Creation](#creation)
-   [Usage](#usage)

* * *

## Creation

For global installation

```bash
appable generate service foo
```

For local installation using npx

```bash
npx appable generate service foo
```

For local installation using script

```bash
npm run appable generate service foo
```

Following files have been generated in app/foo

-   foo.service.js

* * *

## Usage

> Service share data and can notify for changes

-   Handle data

```js
import { Service } from  'appable';

export const FooService = new class extends Service {

  fooList = [];

  post(foo){
    this.fooList.push(foo);
    this.notify();
  }

}();
```

-   Notify for changes

```js
FooService.notify();
```

-   Subscribe/Unsubscribe for changes

Service can **attach** or **detach** functions who are called when **notiy** is call

```js
export class FooComponent extends Component {

    constructor() {
        super('foo', template);
    }

    observer(service) {
        alert(`FooService has ${service.fooList.length} items`)
    }

    onInit() { 
      FooService.attach(this.observer);
    }

    onDestroy() { 
      FooService.detach(this.observer);
    }

}
```

* * *

## ©️ License MIT
