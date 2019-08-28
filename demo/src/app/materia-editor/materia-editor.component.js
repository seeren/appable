import { Component, RouterComponent } from "babel-skeleton";
import template from "./materia-editor.component.html";
import { MateriasService } from "../shared/services/materias.service";

export class MateriaEditorComponent extends Component {

    constructor() {
        super({
            selector: "materia-editor",
            template: template
        });
    }

    onInit() {
        this.materia = MateriasService.find(RouterComponent.get(`id`))
    }

    onUpdate() {
        window.componentHandler.upgradeDom();
    }

    onDescriptionBlur(input) {
        if (input.value) {
            return this.materia.description = input.value;
        }
    }

    onTypeClick(type) {
        return this.materia.type = type;
    }

    onStarClick(level) {
        return this.materia.level = level;
    }

    back() {
        RouterComponent.navigate("materias")
    }

}
