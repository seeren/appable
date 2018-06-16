import template from './demo.html';

export class Demo {

    constructor() {
        this.status = "is ready";
    }

    render() {
        for (var prop in this) {
            eval("var " + prop + ";");
            eval(prop + "=this[prop];");
        }
        window
        .document
        .querySelector("demo")
        .innerHTML = eval("`" + template + "`");
    }

}