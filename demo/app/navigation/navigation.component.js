import { Component } from "../../../src/components/component";
import { RouterComponent } from "../../../src/components/router.component";
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