import { Component } from '../../core/component';

import { app } from './app.component.html';

export class AppComponent extends Component {

    constructor() {
        super({
            selector: "app",
            template: app
        });
    }

}