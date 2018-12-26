import { Component } from "../../../../src/components/component";
import { RouterComponent } from "../../../../src/components/router.component";
import template from "./materia-description.component.html";
import { MateriaService } from "../../shared/services/materia.service";

export class MateriaDescriptionComponent extends Component {

    constructor() {
        super({
            selector: "materia-description",
            template: template,
        });
        let observer = (service) => this.materia = service.get();
        this.onInit = () => MateriaService.attach(observer);
        this.onDestroy = () => MateriaService.detach(observer);
        this.materia = null;
    }

    navigate() {
        RouterComponent.navigate("materia-editor", {
            id: this.materia.id
        });
    }

}