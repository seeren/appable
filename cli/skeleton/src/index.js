import { RouterComponent } from "hybrid-app";

import { AppComponent } from "./app/app.component";

(run => window.cordova
    ? window.document.addEventListener("deviceready", run)
    : window.addEventListener("load", run)
)(() => RouterComponent
    .run(new AppComponent)
);
