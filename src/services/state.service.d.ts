import { Service } from './service';
import { State } from '../models/state.model';
export declare const StateService: {
    /**
     * @returns {State}
     */
    get(): State;
    attach(callable: Function): Service;
    detach(callable: Function): Service;
    notify(): Service;
};
