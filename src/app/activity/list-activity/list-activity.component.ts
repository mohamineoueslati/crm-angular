import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { ActivityResponse } from "src/app/models/activity.model";
import { ActivityService } from "src/app/services/activity.service";

@Component({
  selector: "app-list-activity",
  templateUrl: "./list-activity.component.html",
  styleUrls: ["./list-activity.component.css"],
})
export class ListActivityComponent implements OnInit {
  activities: ActivityResponse[] = [];
  cols: { field: string; header: string }[];

  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "date", header: "Date" },
      { field: "participants", header: "Participants" },
      { field: "subject", header: "Subject" },
      { field: "note", header: "Notes" },
    ];

    this.activityService.getAllActivities().subscribe((activities) => {
      this.activities = activities;
    });
  }

  onDeleteActivity(id: number): void {
    this.confirmationService.confirm({
      message: "Do you want to delete this activity?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.activityService.deleteActivity(id).subscribe((_) => {
          this.removeActivity(id);
        });
      },
    });
  }

  removeActivity(id: number): void {
    const idx = this.activities.findIndex((a) => a.id === id);
    this.activities.splice(idx, 1);
  }
}
