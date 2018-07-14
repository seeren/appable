import template from './demo.component.html';

export class Demo {

    constructor() {
        window.document.createElement('demo');
        this.status = 'is ready';
    }

    render() {
        for (var prop in this) {
            eval('var ' + prop + ';');
            eval(prop + ' = this[prop];');
        }
        window.document.querySelector('demo').innerHTML = eval(
            '`' + template + '`'
        );
    }

}