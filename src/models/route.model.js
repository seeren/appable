import { Component } from '../components/component';

/**
 * @type {Route}
 */
export class Route {

    /**
     * @constructor
     *
     * @param {String} path
     * @param {String} name
     * @param {Component} component
     */
    constructor(path, name, component) {

        /**
         * @param {String} path
         */
        this.path = path;

        /**
         * @param {String} path
         */
        this.name = name;

        /**
         * @param {Component} path
         */
        this.component = component;
    }

}
