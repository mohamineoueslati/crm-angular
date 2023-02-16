import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewActivityComponent } from "./new-activity/new-activity.component";
import { ListActivityComponent } from "./list-activity/list-activity.component";

const routes: Routes = [
  { path: "list", component: ListActivityComponent },
  {
    path: "new",
    component: NewActivityComponent,
  },
  {
    path: "edit/:id",
    component: NewActivityComponent,
  },
  { path: "", redirectTo: "list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityRoutingModule {}
