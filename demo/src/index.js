import { RouterComponent } from "babel-skeleton";
import { AppComponent } from "./app/app.component";
import { MateriasComponent } from "./app/materias/materias.component";
import { MateriaEditorComponent } from "./app/materia-editor/materia-editor.component";

(run => window.cordova
    ? window.document.addEventListener("deviceready", run, false)
    : window.addEventListener("load", run, false)
)(() => RouterComponent
    .add("/", "materias", MateriasComponent)
    .add("/materias/:id", "materia-editor", MateriaEditorComponent)
    .run(new AppComponent)
);
