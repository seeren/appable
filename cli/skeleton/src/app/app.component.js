import { Component } from "app-js";

import template from "./app.component.html";

export class AppComponent extends Component {

    constructor() {
        super({
            selector: "app",
            template: template
        });
        this.status = "Is ready";
    }

}
