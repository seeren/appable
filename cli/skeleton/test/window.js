import jsdom from 'jsdom';

export const window = (() => {

    const { JSDOM } = jsdom;
    const globalWindow = new JSDOM('<!doctype html>').window;
    globalWindow.Error = Error;
    globalWindow.Function = Function;
    globalWindow.JSON = JSON;
    globalWindow.Object = Object;
    globalWindow.RegExp = RegExp;
    globalWindow.parseInt = parseInt;
    global.window = globalWindow;
    return globalWindow;

})();
