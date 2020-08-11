Lifecycle hooks are triggered for routed components

```js
export class FooComponent extends Component {

    constructor() {
        super({ selector: 'foo', template: template });
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

Hooks are usefull for init/destroy values, cancel a back navigation or pause/resume timers