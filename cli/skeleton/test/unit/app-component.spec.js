import { describe, beforeEach, it } from "mocha";
import { assert } from "chai";
import { AppComponent } from "../../src/app/app.component";

describe("AppComponent", () => {

    var component;

    beforeEach(() => component = new AppComponent);

    describe("Selector", () => {
        it("`app` is the selector", () => {
            assert.equal(component.selector, "app")
        });
    });

});