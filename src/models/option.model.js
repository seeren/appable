import { Component } from "../components/component";

/**
 * @type {Option}
 */
export class Option {

    /**
     * @constructor
     * 
     * @param {String} selector 
     * @param {String} template 
     * @param {Component[]} components 
     */
    constructor(selector, template, components) {

        /**
         * @type {String}
         */
        this.selector = selector;

        /**
         * @type {String}
         */
        this.template = template;

        /**
         * @type {Component[]}
         */
        this.components = components;
    }

}