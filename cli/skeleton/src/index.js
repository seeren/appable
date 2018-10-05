import { AppComponent } from "./app/app.component";
import { RouterComponent } from "babel-skeleton/router";

window.onload = () => {
    RouterComponent
    .run(new AppComponent)
}