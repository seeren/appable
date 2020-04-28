import jsdom from 'jsdom';

export const window = (() => {

    const { JSDOM } = jsdom;
    global.window = new JSDOM('<!doctype html>', {
        url: 'http://localhost/',
    }).window;
    global.window.Error = Error;
    global.window.Function = Function;
    global.window.JSON = JSON;
    global.window.Object = Object;
    global.window.RegExp = RegExp;
    global.window.parseInt = parseInt;
    const script = global.window.document.createElement('script');
    const otherScript = global.window.document.createElement('script');
    global.window.document.body.appendChild(otherScript);
    global.window.document.body.appendChild(script);
    script.src = '/dist/index.js';
    otherScript.src = '/other/index.js';
    return global.window;

})();
