import { Component } from "../../../component";
import template from "./materia-preview.component.html";
import { MateriaService } from "../../shared/services/materia.service";

export class MateriaPreviewComponent extends Component {

    constructor() {
        super({
            selector: "materia-preview",
            template: template,
        });
        let observer = () => this.materia = MateriaService.get();
        this.onInit = () => MateriaService.attach(observer);
        this.onDestroy = () => MateriaService.detach(observer);
        this.materia = null;
    }

}