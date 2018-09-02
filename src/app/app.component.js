import { Component } from '../../core/core.component';

import { app } from './app.component.html';
import { DemoComponent } from './demo/demo.component';

export class AppComponent extends Component {

    constructor() {
        super({
            selector: "app",
            template: app,
            components: [
                new DemoComponent
            ]
        });
    }

}