import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListContactComponent } from "./list-contact/list-contact.component";
import { NewContactComponent } from "./new-contact/new-contact.component";
import { ContactRoutingModule } from "./contact-routing.module";

import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { FieldsetModule } from "primeng/fieldset";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { MessageModule } from "primeng/message";
import { CardModule } from "primeng/card";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { ContactActivitiesComponent } from "./contact-activities/contact-activities.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ListContactComponent,
    NewContactComponent,
    ContactDetailsComponent,
    ContactActivitiesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    DropdownModule,
    FormsModule,
    MessageModule,
    CardModule,
    ConfirmDialogModule,
  ],
})
export class ContactModule {}
