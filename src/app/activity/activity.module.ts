import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListActivityComponent } from "./list-activity/list-activity.component";
import { NewActivityComponent } from "./new-activity/new-activity.component";
import { ActivityRoutingModule } from "./activity-routing.module";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { MessageModule } from "primeng/message";
import { CalendarModule } from "primeng/calendar";
import { MultiSelectModule } from "primeng/multiselect";
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { SharedModule } from "../shared/shared.module";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

@NgModule({
  declarations: [ListActivityComponent, NewActivityComponent],
  imports: [
    CommonModule,
    SharedModule,
    ActivityRoutingModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    DropdownModule,
    MessageModule,
    CalendarModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
})
export class ActivityModule {}
