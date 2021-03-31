const callables: Function[] = [];

export class Service {

    /**
     * @param callable 
     * @returns {ThisType}
     */
    public attach(callable: Function): Service {
        callables.push(callable);
        return this;
    }

    /**
     * @param callable 
     * @returns {ThisType}
     */
    public detach(callable: Function): Service {
        const index = callables.indexOf(callable);
        if (-1 !== index) {
            callables.splice(index, 1);
        }
        return this;
    }

    /**
     * @returns {ThisType}
     */
    public notify(): Service {
        callables.forEach((callable: Function) => callable(this));
        return this;
    }

}
