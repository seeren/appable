import { Component } from '../../../../core/component';
import template from './materia-preview.component.html';
import { MateriasService } from '../../shared/services/materias.service';

export class MateriaPreviewComponent extends Component {

    constructor() {
        super({
            selector: 'materia-preview',
            template: template,
        });
        MateriasService.attach((service) => {
            this.materia = service.selected();
            this.update();
        })
    }

}