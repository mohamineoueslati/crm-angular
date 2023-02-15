import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuComponent } from "./menu/menu.component";

import { TieredMenuModule } from "primeng/tieredmenu";

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, TieredMenuModule],
  exports: [MenuComponent],
})
export class CoreModule {}
