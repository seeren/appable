const fs = require('fs');
const path = require('path');

module.exports = {

    write(filename, ext, output) {
        if (!this.createDirs(filename.split('/'))) {
            return false;
        }
        try {
            fs.writeFileSync(`${filename}.${ext}`, output);
        } catch (e) {
            console.error('\x1b[31m', `Generation error: ${e.message}`);
            return false;
        }
        console.log('\x1b[32m', `${filename}.${ext} is generated`);
        return true;
    },

    createDirs(dirs) {
        let currentDir;
        for (let i = 1, l = dirs.length; i < l; i++) {
            currentDir = path.join.apply(null, dirs.slice(0, i));
            try {
                if (!fs.existsSync(currentDir)) {
                    fs.mkdirSync(currentDir)
                }
            } catch (e) {
                console.error('\x1b[31m', `Generation error: ${e.message}`);
                return false;
            }
        }
        return true;
    },

    className(filename) {
        let className = '';
        filename.split('/').pop().split('-').forEach(
            elem => className += elem[0].toUpperCase() + elem.slice(1)
        );
        return className;
    }

}