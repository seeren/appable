#!/usr/bin/env node

const [, , ...args] = process.argv
const npm = require("npm");
const file = require("./file/file");
const service = require("./template/service");
const component = require("./template/component");
const componentHTML = require("./template/component.html");
const componentSass = require("./template/component.scss");
const GENERATE = `generate`;
const NEW = `new`;
const COMPONENT = `component`;
const SERVICE = `service`;
const DEPLOY = [
    `src/app/app.component.html`,
    `src/app/app.component.js`,
    `src/app/app.component.scss`,
    `src/index.js`,
    `src/index.scss`,
    `test/unit/app-component.spec.js`,
    `test/window.js`,
    `www/assets/.gitkeep`,
    `www/dist/.gitkeep`,
    `www/index.html`,
    `.babelrc`, ,
    `.nycrc`,
    `.travis.yml`,
    `config.xml`,
    `package.json`,
    `POLICY`,
    `README.md`,
    `webpack.config.js`
];
const IGNORE = `/.nyc_output/
/.vscode/
/coverage/
/node_modules/
/platforms/
/plugins/
/www/dist/index.*
package-lock.json`;

if (!args.length || (args[0] !== GENERATE && args[0] !== NEW)) {
    console.log("\x1b[36m", "Available Commands:");
    console.log("\x1b[36m", ">", "\x1b[0m", GENERATE);
    console.log("\x1b[36m", ">", "\x1b[0m", NEW);
} else if (args[0] === GENERATE) {
    if (!args[1] || (args[1] !== COMPONENT && args[1] !== SERVICE)) {
        console.log("\x1b[36m", "You can generate:");
        console.log("\x1b[36m", ">", "\x1b[0m", COMPONENT);
        console.log("\x1b[36m", ">", "\x1b[0m", SERVICE);
        return;
    } else if (!args[2]) {
        return console.error(
            "\x1b[31m", "\u00D7", "\x1b[0m", `You must provide a file name`
        );
    } else if (!/^[0-9a-zA-Z\.\/-]{1,}$/.test(args[2])) {
        return console.error(
            "\x1b[31m", "\u00D7", "\x1b[0m", `Invalid file name`
        );
    } else if (args[1] === SERVICE) {
        console.log("\x1b[36m", `Generate ${SERVICE}`);
        file.write(
            `src/${args[2]}.${SERVICE}.js`,
            service(file.className(args[2]))
        );
    } else if (args[1] === COMPONENT) {
        console.log("\x1b[36m", `Generate ${COMPONENT}`);
        file.write(
            `src/${args[2]}.${COMPONENT}.js`,
            component(args[2].split("/").pop(),
                file.className(args[2]))
        );
        file.write(
            `src/${args[2]}.${COMPONENT}.html`,
            componentHTML(args[2].split("/").pop())
        );
        file.write(
            `src/${args[2]}.${COMPONENT}.scss`,
            componentSass(args[2].split("/").pop())
        );
    }
} else if (args[0] === NEW) {
    if (!args[1]) {
        return console.error(
            "\x1b[31m", "\u00D7", "\x1b[0m", `You must provide a project name`
        );
    } else if (!/^[0-9a-zA-Z-]{1,}$/.test(args[1])) {
        return console.error(
            "\x1b[31m", "\u00D7", "\x1b[0m", `Invalid project name`
        );
    } else {
        let projectName = args[1];
        let package = [];
        let includePath = `node_modules/babel-skeleton/cli/skeleton`;
        for (let key in JSON.parse(
            file.read(`${includePath}/package.json`).toString()
        ).devDependencie) {
            package.push(key)
        }
        console.log("\x1b[36m", "Generate files");
        DEPLOY.forEach((filename) => {
            let output = file.read(`${includePath}/${filename}`) || ``;
            file.write(
                `${projectName}/${filename}`,
                output.toString().replace(
                    /project-name/g,
                    `config.xml` !== filename
                        ? projectName
                        : projectName.replace(`-`, ``))
            )
        })
        file.write(`${projectName}/.gitignore`, IGNORE)
        console.log("\x1b[36m", "Installing packages");
        npm.load({ loaded: false }, (err) => {
            npm.prefix = projectName;
            npm.commands.install(package, () => { });
        });
    }
}