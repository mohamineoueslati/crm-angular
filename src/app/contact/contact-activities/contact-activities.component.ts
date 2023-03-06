import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { ActivityResponse } from "src/app/models/activity.model";
import { ActivityService } from "src/app/services/activity.service";

@Component({
  selector: "app-contact-activities",
  templateUrl: "./contact-activities.component.html",
  styleUrls: ["./contact-activities.component.css"],
})
export class ContactActivitiesComponent implements OnInit {
  activities: ActivityResponse[] = [];
  cols: { field: string; header: string }[];

  constructor(
    private route: ActivatedRoute,
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

    const contactId = +this.route.parent.snapshot.params["id"];

    if (typeof contactId === "number") {
      this.activityService
        .getActivitiesByContactId(contactId)
        .subscribe((activities) => (this.activities = activities));
    }
  }

  onDeleteActivity(id: number): void {
    this.confirmationService.confirm({
      message: "Do you want to delete this activity?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.activityService.deleteActivity(id).subscribe();
      },
    });
  }
}
