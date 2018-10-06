import { Component } from '../../component';
import template from './materias.component.html';
import { MateriasService } from '../shared/services/materias.service';
import { MateriaPreviewComponent } from './materia-preview/materia-preview.component';
import { MateriaDescriptionComponent } from './materia-description/materia-description.component';
import { MateriaService } from '../shared/services/materia.service';

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
    }

    onInit() {
        this.materia = MateriaService.get();
        this.materias = MateriasService.get();
    }

    onClick(id) {
        this.materia = MateriasService.find(id);
        MateriaService.post(this.materia);
        return id;
    }

}