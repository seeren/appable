const fs = require("fs");
const path = require("path");

module.exports = {

    /**
     * @param {srting} filename 
     * @param {srting} output 
     */
    write(filename, output) {
        if (!this.createDirs(filename.split("/"))) {
            return false;
        }
        try {
            fs.writeFileSync(filename, output);
        } catch (e) {
            console.error(
                "\x1b[31m", "\u00D7", "\x1b[0m", `Generate error: ${e.message}`
            );
            return false;
        }
        console.log("\x1b[32m", "\u2713", "\x1b[0m", filename);
        return true;
    },

    /**
     * @param {string} filename 
     */
    read(filename) {
        let output;
        try {
            output = fs.readFileSync(filename);
        } catch (e) {
            console.error(
                "\x1b[31m", "\u00D7", "\x1b[0m", `Read error: ${e.message}`
            );
        }
        return output;
    },

    /**
     * @param {Array} dirs 
     */
    createDirs(dirs) {
        let currentDir;
        for (let i = 1, l = dirs.length; i < l; i++) {
            currentDir = path.join.apply(null, dirs.slice(0, i));
            try {
                if (!fs.existsSync(currentDir)) {
                    fs.mkdirSync(currentDir)
                }
            } catch (e) {
                console.error(
                    "\x1b[31m", "\u00D7", "\x1b[0m", `Generate error: ${e.message}`
                );
                return false;
            }
        }
        return true;
    },

    /**
     * @param {string} filename 
     */
    className(filename) {
        let className = "";
        filename.split("/").pop().split("-").forEach(
            elem => className += elem[0].toUpperCase() + elem.slice(1)
        );
        return className;
    }

}