import { Component } from "hybrid-app";

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
