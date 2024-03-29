/**
 * @param {String} filename
 * @param {String} className
 */
module.exports = (filename, className) => `import { Component } from 'appable';

import template from './${ filename }.component.html';

export class ${ className }Component extends Component {

    /**
     * @constructor
     */
    constructor() {
        super('${ filename }', template);
    }

    /**
     * Called after the component is attached
     */
    onInit() { }

    /**
     * Called after the component is displayed
     *
     * @param {HTMLElement}
     */
    onUpdate(element) { }

    /**
     * Called after the component is detached
     */
    onDestroy() { }

    /**
     * Called after the user trigger the back button
     * You can cancel the back navigation by returning false
     *
     * @returns {Boolean}
     */
    onBack() { }

    /**
     * Called after the user trigger the pause button
     */
    onPause() { }

    /**
     * Called after the user trigger the resume button
     */
    onResume() { }

}
`;
