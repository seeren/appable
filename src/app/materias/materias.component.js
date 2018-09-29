import { Component } from '../../../core/component';
import template from './materias.component.html';
import { MateriasService } from '../shared/services/materias.service';
import { MateriaPreviewComponent } from './materia-preview/materia-preview.component';
import { MateriaDescriptionComponent } from './materia-description/materia-description.component';

export class MateriasComponent extends Component {

    constructor() {
        super({
            selector: 'materias',
            template: template,
            components: [
                new MateriaPreviewComponent,
                new MateriaDescriptionComponent
            ]
        });
        this.materias = MateriasService.get()
    }

    select(id) {
        MateriasService.select(id)
    }

}