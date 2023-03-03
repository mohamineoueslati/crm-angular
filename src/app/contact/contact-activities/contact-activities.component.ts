import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { Subscription } from "rxjs";
import { ActivityResponse } from "src/app/models/activity.model";
import { ActivityService } from "src/app/services/activity.service";
import { ContactService } from "src/app/services/contact.service";

@Component({
  selector: "app-contact-activities",
  templateUrl: "./contact-activities.component.html",
  styleUrls: ["./contact-activities.component.css"],
})
export class ContactActivitiesComponent implements OnInit, OnDestroy {
  activities: ActivityResponse[] = [];
  cols: { field: string; header: string }[];
  activitiesIdsSubscription: Subscription;

  constructor(
    private contactService: ContactService,
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

    this.activitiesIdsSubscription =
      this.contactService.$publishContactActivitiesIds.subscribe((ids) => {
        this.activityService
          .getActivitiesByIds(ids)
          .subscribe((activities) => (this.activities = activities));
      });
  }

  ngOnDestroy(): void {
    this.activitiesIdsSubscription.unsubscribe();
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
