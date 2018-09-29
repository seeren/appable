export class Materia {

    static MAGIC() {
        return "Magic"
    }

    static SUPPORT() {
        return "Support"
    }

    static ORDER() {
        return "Order"
    }

    static INDEPENDENT() {
        return "Independent"
    }

    static INVOCATION() {
        return "Invocation"
    }

    constructor(id, name, description, type, levels) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.levels = levels
    }

}