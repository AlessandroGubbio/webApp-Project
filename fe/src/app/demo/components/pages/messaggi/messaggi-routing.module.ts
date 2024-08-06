import { NgModule } from "@angular/core";
import { MessaggiComponent } from "./messaggi.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports:[RouterModule.forChild([
        { path : '', component: MessaggiComponent}
    ])],
    exports: [RouterModule]
})
export class MessaggiRoutingModule{}