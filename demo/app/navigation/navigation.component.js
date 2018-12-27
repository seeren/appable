import { Component } from "../../../dist/index";
import { RouterComponent } from "../../../dist/index";
import template from "./navigation.component.html";

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