import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewContactComponent } from "./new-contact/new-contact.component";
import { ListContactComponent } from "./list-contact/list-contact.component";

const routes: Routes = [
  { path: "list", component: ListContactComponent },
  {
    path: "new",
    component: NewContactComponent,
  },
  {
    path: "edit/:id",
    component: NewContactComponent,
  },
  { path: "", redirectTo: "list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
