### Handle data

Service share data and can notify for changes

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

}
```

### Notify for changes

```js
FooService.notify();
```

### Subscribe/Unsubscribe for changes

Service can **attach** or **detach** functions who are called when **notiy** is called

```js
export class FooComponent extends Component {

    constructor() {
        super({ selector: 'foo', template: template });
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