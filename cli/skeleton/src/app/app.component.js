import { Component } from 'appable';

// @ts-ignore
import template from './app.component.html';

export class AppComponent extends Component {

    constructor() {
        super({ selector: 'app', template });
        this.status = 'Is ready';
    }

}
