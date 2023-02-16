import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { Activity } from "src/app/models/activity.model";
import { ActivityService } from "src/app/services/activity.service";

@Component({
  selector: "app-contact-activities",
  templateUrl: "./contact-activities.component.html",
  styleUrls: ["./contact-activities.component.css"],
})
export class ContactActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  cols: { field: string; header: string }[];

  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "date", header: "Date" },
      { field: "participants", header: "Participants" },
      { field: "subject", header: "Subject" },
      { field: "note", header: "Notes" },
    ];

    const id = this.route.parent.snapshot.params["id"];
    if (!isNaN(id)) {
      this.activities = this.activityService.activities.filter((ac) => {
        return ac.participants.some((p) => p.id === +id);
      });
    }
  }

  onDeleteActivity(id: number): void {
    this.confirmationService.confirm({
      message: "Do you want to delete this contact?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.activityService.deleteActivity(id);
      },
    });
  }
}
