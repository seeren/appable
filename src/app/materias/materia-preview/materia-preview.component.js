import { Component } from '../../../../core/component';
import template from './materia-preview.component.html';
import { MateriaService } from '../../shared/services/materia.service';

export class MateriaPreviewComponent extends Component {

    constructor() {
        super({
            selector: 'materia-preview',
            template: template,
        });
        let observer = (service) => {
            this.materia = service.get();
            this.update();
        }
        this.onInit = () => MateriaService.attach(observer);
        this.onDestroy = () =>  MateriaService.detach(observer);
    }
    
}