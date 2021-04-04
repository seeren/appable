#!/usr/bin/env node

const [, , ...args] = process.argv;

/**
 * @type {Object}
 */
const npm = require('npm');

/**
 * @type {Object}
 */
const file = require('./file/file');

/**
 * @type {Function}
 */
const service = require('./template/service');

/**
 * @type {Function}
 */
const component = require('./template/component');

/**
 * @type {Function}
 */
const componentHTML = require('./template/component.html');

/**
 * @type {Function}
 */
const componentSass = require('./template/component.scss');

/**
 * @type {String}
 */
const GENERATE = 'generate';

/**
 * @type {String}
 */
const NEW = 'new';

/**
 * @type {String}
 */
const COMPONENT = 'component';

/**
 * @type {String}
 */
const SERVICE = 'service';

/**
 * @type {String}
 */
const IGNORE = `/.nyc_output/
/.vscode/
/coverage/
/node_modules/
/platforms/
/plugins/
/resources/android/
/www/dist/index.*
package-lock.json`;

/**
 * @type {Array}
 */
const DEPLOY = [
    'assets/.gitkeep',
    'src/app/app.component.html',
    'src/app/app.component.js',
    'src/app/app.component.scss',
    'src/index.js',
    'src/index.scss',
    'test/unit/app-component.spec.js',
    'test/window.js',
    'www/dist/.gitkeep',
    'www/index.html',
    '.babelrc',
    '.eslintrc.js',
    '.nycrc',
    '.travis.yml',
    'config.xml',
    'package.json',
    'POLICY',
    'README.md',
    'webpack.config.js',
];
(function cli() {
    if (!args.length || (args[0] !== GENERATE && args[0] !== NEW)) {
        console.warn('\x1b[36m', 'Available Commands:');
        console.warn('\x1b[36m', '>', '\x1b[0m', GENERATE);
        return console.warn('\x1b[36m', '>', '\x1b[0m', NEW);
    }
    if (args[0] === GENERATE) {
        if (!args[1] || (args[1] !== COMPONENT && args[1] !== SERVICE)) {
            console.warn('\x1b[36m', 'You can generate:');
            console.warn('\x1b[36m', '>', '\x1b[0m', COMPONENT);
            return console.warn('\x1b[36m', '>', '\x1b[0m', SERVICE);
        }
        if (!args[2]) {
            return console.error('\x1b[31m', '\u00D7', '\x1b[0m', 'You must provide a file name');
        }
        if (!/^[0-9a-zA-Z./-]{1,}$/.test(args[2])) {
            return console.error('\x1b[31m', '\u00D7', '\x1b[0m', 'Invalid file name');
        }
        if (args[1] === SERVICE) {
            console.warn('\x1b[36m', `Generate ${SERVICE}`);
            return file.write(
                `src/app/${args[2]}/${args[2].split('/').pop()}.${SERVICE}.js`,
                service(file.className(args[2])),
            );
        }
        if (args[1] === COMPONENT) {
            const componentName = args[2].split('/').pop();
            const componentPath = `src/app/${args[2]}/${componentName}`;
            console.warn('\x1b[36m', `Generate ${COMPONENT}`);
            file.write(
                `${componentPath}.${COMPONENT}.js`,
                component(componentName, file.className(args[2])),
            );
            file.write(
                `${componentPath}.${COMPONENT}.html`,
                componentHTML(componentName),
            );
            return file.write(
                `${componentPath}.${COMPONENT}.scss`,
                componentSass(componentName),
            );
        }
        return false;
    }
    if (args[0] === NEW) {
        if (!args[1]) {
            return console.error('\x1b[31m', '\u00D7', '\x1b[0m', 'You must provide a project name');
        }
        if (!/^[0-9a-zA-Z-]{1,}$/.test(args[1])) {
            return console.error('\x1b[31m', '\u00D7', '\x1b[0m', 'Invalid project name');
        }
        const projectName = args[1];
        const packages = [];
        const includePath = `${__dirname}/skeleton`;
        Object.keys(JSON.parse(file.read(
            `${includePath}/package.json`,
        ).toString()).devDependencies).forEach((key) => packages.push(key));
        console.warn('\x1b[36m', 'Generate files');
        DEPLOY.forEach((filename) => {
            const output = file.read(`${includePath}/${filename}`) || '';
            file.write(
                `${projectName}/${filename}`,
                output.toString().replace(
                    /{ projectName }/g,
                    'config.xml' !== filename ? projectName : projectName.replace(/-/g, ''),
                ),
            );
        });
        file.write(`${projectName}/.gitignore`, IGNORE);
        console.warn('\x1b[36m', 'Installing packages');
        return npm.load(() => {
            npm.prefix = projectName;
            npm.commands.install(packages, () => { });
        });
    }
    return false;
}());