#!/usr/bin/env node

const [, , ...args] = process.argv
const file = require('./file/file');
const service = require('./template/service');
const component = require('./template/component');
const componentHTML = require('./template/component.html');
const componentSass = require('./template/component.scss');

if (!args.length) {
    console.log('\x1b[32m', 'Available Commands:');
    console.log('\x1b[0m', '- generate');
    console.log('\x1b[0m', '- new');
} else if (args[0] === `generate`) {
    if (!args[1] || (args[1] !== 'component' && args[1] !== 'service')) {
        return console.warn('\x1b[31m', `You must select component or service`);
    } else if (!args[2]) {
        return console.error('\x1b[31m', `You must provide a file name`);
    } else if (!/^[0-9a-zA-Z\.\/-]{1,}$/.test(args[2])) {
        return console.error('\x1b[31m', `Invalid file name`);
    } else if (args[1] === 'service') {
        file.write(args[2], 'service.js', service(file.className(args[2])));
    } else if (args[1] === 'component') {
        file.write(args[2], 'component.js', component(args[2].split('/').pop(), file.className(args[2])));
        file.write(args[2], 'component.html', componentHTML(args[2].split('/').pop()));
        file.write(args[2], 'component.scss', componentSass(args[2].split('/').pop()));
    }
}
