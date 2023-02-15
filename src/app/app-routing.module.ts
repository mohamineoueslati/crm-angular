import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "contacts", loadChildren: "./contact/contact.module#ContactModule" },
  {
    path: "activities",
    loadChildren: "./activity/activity.module#ActivityModule",
  },
  { path: "", redirectTo: "contacts", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
