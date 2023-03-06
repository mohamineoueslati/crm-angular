import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectItem } from "primeng/components/common/selectitem";
import { map } from "rxjs/operators";
import {
  ActivityRequest,
  ActivityResponse,
} from "src/app/models/activity.model";
import { ActivityService } from "src/app/services/activity.service";
import { ContactService } from "src/app/services/contact.service";
import { ValidationMessageService } from "src/app/services/validation-message.service";

@Component({
  selector: "app-new-activity",
  templateUrl: "./new-activity.component.html",
  styleUrls: ["./new-activity.component.css"],
})
export class NewActivityComponent implements OnInit {
  activityForm: FormGroup;
  activityTypeOptions: SelectItem[] = [];
  participantsOptions: SelectItem[] = [];
  isFormSubmitted = false;
  isEditMode = false;
  activityRes: ActivityResponse;

  constructor(
    private activityService: ActivityService,
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private validationMessageService: ValidationMessageService
  ) {
    this.initForm();
    this.buildActivityTypeOptions();
    this.buildParticipantsOptions();
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.isEditMode = !isNaN(id);

    if (this.isEditMode) {
      this.activityService.getActivity(+id).subscribe((activity) => {
        this.activityRes = activity;
        this.setFormValues();
      });
    }
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.activityForm.valid) {
      const values = this.activityForm.value;
      const newActivity = new ActivityRequest(
        null,
        values["date"],
        values["activityType"],
        values["note"],
        values["documents"],
        values["subject"],
        values["participants"]
      );

      if (this.isEditMode) {
        newActivity.id = this.activityRes.id;
        this.activityService
          .updateActivity(newActivity)
          .subscribe((_) => this.router.navigateByUrl("/activities/list"));
      } else {
        this.activityService
          .addActivity(newActivity)
          .subscribe((_) =>
            this.router.navigate(["../", "list"], { relativeTo: this.route })
          );
      }
    }
  }

  getFormControl(controlName: string): FormControl {
    if (this.activityForm.contains(controlName))
      return this.activityForm.controls[controlName] as FormControl;

    return null;
  }

  getValidationMessages(state: any, fieldName: string): string[] {
    return this.validationMessageService.getValidationMessages(
      state,
      fieldName
    );
  }

  private initForm(): void {
    this.activityForm = this.fb.group({
      date: [null, Validators.required],
      activityType: [null, Validators.required],
      subject: [""],
      participants: [[]],
      note: [""],
      documents: [[]],
    });
  }

  private setFormValues(): void {
    this.activityForm.setValue({
      date: new Date(this.activityRes.date),
      activityType: this.activityRes.activityType,
      subject: this.activityRes.subject,
      participants: this.activityRes.participants
        ? this.activityRes.participants.map((p) => p.id)
        : [],
      note: this.activityRes.note,
      documents: this.activityRes.documents ? this.activityRes.documents : [],
    });
  }

  private buildActivityTypeOptions(): void {
    this.activityTypeOptions = [
      { label: "Appel", value: "APPEL" },
      { label: "Diner", value: "DINER" },
      { label: "Email", value: "EMAIL" },
      { label: "Comité de gestion", value: "COMITE_DE_GESTION" },
      { label: "Réunion", value: "REUNION" },
      { label: "Note", value: "NOTE" },
    ];
  }

  private buildParticipantsOptions(): void {
    this.contactService
      .getContacts()
      .pipe(
        map((contacts) => {
          return contacts.map((c) => {
            return { label: `${c.firstName} ${c.lastName}`, value: c.id };
          });
        })
      )
      .subscribe((contacts) => (this.participantsOptions = contacts));
  }
}
