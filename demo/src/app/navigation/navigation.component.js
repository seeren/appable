import { Component, RouterComponent } from "babel-skeleton";

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
