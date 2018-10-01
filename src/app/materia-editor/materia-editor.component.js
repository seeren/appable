import { Component } from '../../../core/component';
import template from './materia-editor.component.html';
import { Materia } from '../shared/models/materia.model';
import { RouterComponent } from '../../../core/router/router.component';
import { MateriasService } from '../shared/services/materias.service';
import { MateriaService } from '../shared/services/materia.service';

export class MateriaEditorComponent extends Component {

    constructor() {
        super({
            selector: 'materias-editor',
            template: template
        });
    }

    onInit() {
        this.materia = MateriasService.find(RouterComponent.get(`id`))
        MateriaService.post(this.materia);
    }

    onDestroy() {
        console.log("MateriaEditorComponent");
    }

}