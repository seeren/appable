import { RouterComponent } from 'appable';

import { AppComponent } from './app/app.component';

((run) => (window.cordova
    ? window.document.addEventListener('deviceready', run)
    : window.addEventListener('load', run))
)(() => RouterComponent
    //  TODO Add routes
    .run(new AppComponent()));
