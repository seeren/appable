import { Component } from '../../../../core/component';
import template from './materia-description.component.html';
import { RouterComponent } from '../../../../core/router/router.component';
import { MateriaService } from '../../shared/services/materia.service';

export class MateriaDescriptionComponent extends Component {

    constructor() {
        super({
            selector: 'materia-description',
            template: template,
        });
        let observer = (service) => {
            this.materia = service.get();
            this.update();
        }
        this.onInit = () => MateriaService.attach(observer);
        this.onDestroy = () =>  MateriaService.detach(observer);
    }

    navigate() {
        RouterComponent.navigate('materia-editor', {
            id: this.materia.id
        });
    }

}