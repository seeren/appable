import { Component } from 'appable';

import template from './app.component.html';

export class AppComponent extends Component {

    status = 'Is ready';

    constructor() {
        super('app', template);
    }

}
