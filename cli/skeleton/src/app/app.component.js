import { Component } from "appable";
import template from "./app.component.html";
import "./app.component.scss";

export class AppComponent extends Component {

    constructor() {
        super({
            selector: "app",
            template
        });
        this.status = "Is ready";
    }

}
