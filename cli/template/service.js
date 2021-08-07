/**
 * @param {String} className
 */
module.exports = (className) => `import { Service } from 'appable';

export const ${ className }Service = new class extends Service {

}();
`;
