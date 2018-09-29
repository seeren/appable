import { Component } from '../../core/component';

import { template } from './app.component.html';
import { NavigationComponent } from './navigation/navigation.component';

export class AppComponent extends Component {

    constructor() {
        super({
            selector: `app`,
            template: template,
            components: [
                new NavigationComponent,
                new NavigationComponent
            ]
        });
    }

    update() {
        super.update();
        window.componentHandler.upgradeDom();
    }

}