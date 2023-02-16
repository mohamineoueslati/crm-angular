import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivityTableComponent } from "./activity-table/activity-table.component";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ActivityTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [ActivityTableComponent],
})
export class SharedModule {}
