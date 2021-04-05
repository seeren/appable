<h1 align="center">Services</h1>

*  [Creation](#creation)
*  [Usage](#usage)

___

## Creation

For *global* installation

```bash
appable generate service foo
```

For *local* installation using npx

```bash
npx appable generate service foo
```

For *local* installation using script

```bash
npm run appable generate service foo
```

Following files have been generated in app/foo

*  foo.service.js

___

## Usage

> Service share data and can notify for changes

*  Handle data

```js
import { Service } from  'appable';

export const FooService = new class extends Service {

  constructor() {
    super();
    this.data = [];
  }

  post(data){
    this.data.push(data);
    this.notify();
  }

}();
```

*  Notify for changes

```js
FooService.notify();
```

*  Subscribe/Unsubscribe for changes

Service can **attach** or **detach** functions who are called when **notiy** is call

```js
export class FooComponent extends Component {

    constructor() {
        super('foo', template);
    }

    observer(service) {
        alert(`BazService has ${service.data.length} items`)
    }

    onInit() { 
      FooService.attach(this.observer);
    }

    onDestroy() { 
      FooService.detach(this.observer);
    }

}
```

___

## ©️ License MIT