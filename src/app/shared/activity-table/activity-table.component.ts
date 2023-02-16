import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Activity } from "src/app/models/activity.model";

@Component({
  selector: "app-activity-table",
  templateUrl: "./activity-table.component.html",
  styleUrls: ["./activity-table.component.css"],
})
export class ActivityTableComponent implements OnInit {
  @Input() activities: Activity[] = [];
  @Input() cols: { field: string; header: string }[] = [];
  @Output() deleteActivity = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onDeleteActivity(id: number): void {
    this.deleteActivity.next(id);
  }
}
