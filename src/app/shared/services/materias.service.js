import { Materia } from './../models/materia.model'
import { Service } from '../../../../core/service';

export const MateriasService = new class MateriasService extends Service {

    constructor() {
        super();
        this.materias = [
            new Materia(
                1,
                "Foo attaque",
                "Description",
                Materia.MAGIC,
                4
            ),
            new Materia(
                2,
                "Bar attaque",
                "Description",
                Materia.MAGIC,
                4
            ),
            new Materia(
                3,
                "Baz attaque",
                "Description",
                Materia.MAGIC,
                4
            )
        ];
    }

    get() {
        return this.materias
    }

    post(materia) {
        this.materias.push(materia)
    }

    find(id){
        return this.materias.find(materia => id === materia.id);
    }

}