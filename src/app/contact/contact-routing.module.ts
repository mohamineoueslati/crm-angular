import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewContactComponent } from "./new-contact/new-contact.component";
import { ListContactComponent } from "./list-contact/list-contact.component";
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { ContactActivitiesComponent } from "./contact-activities/contact-activities.component";

const routes: Routes = [
  { path: "list", component: ListContactComponent },
  {
    path: "details",
    component: ContactDetailsComponent,
    children: [
      {
        path: "new",
        component: NewContactComponent,
      },
    ],
  },
  {
    path: "details/:id",
    component: ContactDetailsComponent,
    children: [
      {
        path: "profile",
        component: NewContactComponent,
      },
      {
        path: "activities",
        component: ContactActivitiesComponent,
      },
    ],
  },
  { path: "", redirectTo: "list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
