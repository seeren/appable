import { Component } from '../../../core/component';
import template from './navigation.component.html';
import { RouterComponent } from '../../../core/router/router.component';

export class NavigationComponent extends Component {

    constructor() {
        super({
            selector: 'navigation',
            template: template
        });
    }

    navigate(name) {
        RouterComponent.navigate(name);
    }

}