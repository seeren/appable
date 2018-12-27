import { Materia } from "./../models/materia.model"
import { Service } from "../../../../dist/index";

export const MateriasService = new class MateriasService extends Service {

    constructor() {
        super();
        this.materias = [
            new Materia(
                1,
                "Comet",
                "Use a Comet",
                "magic",
                3
            ),
            new Materia(
                2,
                "Restore",
                "Restore HP",
                "magic",
                5
            ),
            new Materia(
                3,
                "Knights of Round",
                "Non-elemental damage",
                "summon",
                5
            ),
            new Materia(
                4,
                "Double Cut",
                "Attacks consecutively",
                "command",
                3
            ),
            new Materia(
                5,
                "Slash-All",
                "Attack all opponents ",
                "command",
                3
            ),
            new Materia(
                6,
                "All",
                "Target all allies or enemies",
                "support",
                5
            ),
            new Materia(
                7,
                "HP Plus",
                "Increases HP",
                "independent",
                5
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
        return this.materias.find(materia => id == materia.id);
    }

}