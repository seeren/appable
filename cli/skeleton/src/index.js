import { AppComponent } from "./app/app.component";
import { RouterComponent } from "babel-skeleton";

window.onload = () => {
    RouterComponent
        .run(new AppComponent)
}
