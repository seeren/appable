import { Component } from "../../component";
import template from "./navigation.component.html";
import { RouterComponent } from "../../router";

export class NavigationComponent extends Component {

    constructor() {
        super({
            selector: "navigation",
            template: template
        });
    }

    navigate(name) {
        RouterComponent.navigate(name);
    }

}