import { Component } from "../components/component";

/**
 * @type {ComponentOption}
 */
export class ComponentOption {

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