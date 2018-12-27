import {
    Component,
    RouterComponent
} from "../../../src/index";
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