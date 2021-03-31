export declare class Service {
    /**
     * @param callable
     * @returns {ThisType}
     */
    attach(callable: Function): Service;
    /**
     * @param callable
     * @returns {ThisType}
     */
    detach(callable: Function): Service;
    /**
     * @returns {ThisType}
     */
    notify(): Service;
}
