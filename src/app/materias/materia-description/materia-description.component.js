import { Component } from '../../../../core/component';
import template from './materia-description.component.html';
import { RouterComponent } from '../../../../core/router/router.component';
import { MateriasService } from '../../shared/services/materias.service';

export class MateriaDescriptionComponent extends Component {

    constructor() {
        super({
            selector: 'materia-description',
            template: template,
        });
        MateriasService.attach((service) => {
            this.materia = service.selected();
            this.update();
        })
    }

    navigate() {
        RouterComponent.navigate('materia-editor', {
            id: this.materia.id
        });
    }

}