import { Service } from '../../../../core/service';

export const MateriaService = new class MateriaService extends Service {

    constructor() {
        super();
        this.materia;
    }

    get() {
        return this.materia
    }

    post(materia) {
        this.materia = materia
        this.notify();
    }

}