const browserify = require("browserify");
const through = require('through');

/**
 * 
 * @param {string} path the absolute path to the module to load
 * @param {string} name the name that it will be assigned to. (module.exports will be
 * assigned to window.name inside browser.) **No spaces**.
 * @param {string[]} ignoredModules names of module to ignore. ex : 'selenium-webdriver'
 * 
 * @returns {Promise<string>}
 */
function getModuleLoadingScript(path, name, ignoredModules) {
    return new Promise(res => {
        let b = browserify(path);
        if (ignoredModules) {
            ignoredModules.forEach(m => {
                b = b.ignore(m);
            });
        }
        b.transform(function(file) {
                var data = '';
                if (file === path) {
                    return through(write, end);
                } else {
                    return through(write, regularEnd);
                }

                function write(buf) { this.queue(buf); }

                function end() {
                    this.queue('\n');
                    this.queue('window.' + name + ' = module.exports;')
                    this.queue(null);
                }

                function regularEnd() {
                    this.queue(null);
                }
            })
            .bundle((err, src) => {
                //console.log(src.toString());
                res(src.toString());
            });
    });
}

module.exports = { getModuleLoadingScript };