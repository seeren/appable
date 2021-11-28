import { RouterComponent } from 'appable';

import { AppComponent } from './app/app.component';

((main) => (window.cordova
    ? window.document.addEventListener('deviceready', run)
    : window.addEventListener('load', main))
)(() => RouterComponent

    /**
     * TODO Add routes
     * 
     * @example: .add('/home', 'home', HomeComponent)
     */

    .run(new AppComponent()));
