import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivityResponse } from "src/app/models/activity.model";
import { Contact } from "src/app/models/contact.model";
import { ContactService } from "src/app/services/contact.service";

@Component({
  selector: "app-activity-table",
  templateUrl: "./activity-table.component.html",
  styleUrls: ["./activity-table.component.css"],
})
export class ActivityTableComponent implements OnInit {
  @Input() activities: ActivityResponse[] = [];
  @Input() cols: { field: string; header: string }[] = [];
  @Output() deleteActivity = new EventEmitter<number>();

  constructor(private contactService: ContactService) {}

  ngOnInit() {}

  onDeleteActivity(id: number): void {
    this.deleteActivity.next(id);
  }

  getContactFullName(contact: Contact): string {
    return this.contactService.getContactFullName(contact);
  }
}
