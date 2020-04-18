export class Service {

    constructor();

    /**   
     * Attach a callable
     * 
     * @example
     * 
     * const callable = s => console.log(s);
     * FooService.attach(callable)
     * 
     * @param callable 
     */
    attach(callable: Function): Service;

    /**   
     * Detach a callable
     * 
     * @example
     * 
     * const callable = s => console.log(s);
     * FooService.detach(callable)
     * 
     * @param callable 
     */
    detach(callable: Function): Service;

    /**
     * Call attached callables
     * 
     * @example
     * FooService.notify()
     */
    notify(): Service;

}
