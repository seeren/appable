import jsdom from 'jsdom';

export const window = (() => {

    const { JSDOM } = jsdom;
    // @ts-ignore
    global.window = new JSDOM('<!doctype html>').window;
    global.window.Error = Error;
    global.window.Function = Function;
    global.window.JSON = JSON;
    global.window.Object = Object;
    global.window.RegExp = RegExp;
    global.window.parseInt = parseInt;
    return global.window;

})();
