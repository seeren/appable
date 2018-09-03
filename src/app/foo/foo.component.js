import { Component } from '../../../core/component';
import foo from './foo.component.html';

export class FooComponent extends Component {

    constructor() {
        super({
            selector: 'foo',
            template: foo
        });

        this.enable = false;

    }

    toogle() {
        return this.enable = !this.enable;
    }

}