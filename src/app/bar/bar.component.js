import { Component } from '../../../core/core.component';
import bar from './bar.component.html';

export class BarComponent extends Component {

    constructor() {
        super({
            selector: 'bar',
            template: bar
        });

        this.enable = false;

    }

    toogle() {
        return this.enable = !this.enable;
    }

}