export class Service {

    private callables: Function[] = [];

    /**
     * @param callable 
     * @returns {ThisType}
     */
    public attach(callable: Function): Service {
        this.callables.push(callable);
        return this;
    }

    /**
     * @param callable 
     * @returns {ThisType}
     */
    public detach(callable: Function): Service {
        const index = this.callables.indexOf(callable);
        if (-1 !== index) {
            this.callables.splice(index, 1);
        }
        return this;
    }

    /**
     * @returns {ThisType}
     */
    public notify(): Service {
        this.callables.forEach((callable: Function) => callable(this));
        return this;
    }

}
