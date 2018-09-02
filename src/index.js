import { AppComponent } from "./app/app.component";

(run => window.cordova
    ? window.document.addEventListener("deviceready", run, false)
    : window.addEventListener("load", run, false)
)(() => {

    (new AppComponent).update();

});