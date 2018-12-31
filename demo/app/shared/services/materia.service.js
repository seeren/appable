import { Service } from "../../../../src/index";

export const MateriaService = new class MateriaService extends Service {

    constructor() {
        super();
        this.materia = null;
    }

    get() {
        return this.materia
    }

    post(materia) {
        this.materia = materia
        this.notify();
    }

}
