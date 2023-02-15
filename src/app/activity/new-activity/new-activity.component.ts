import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectItem } from "primeng/components/common/selectitem";
import { Activity } from "src/app/models/activity.model";
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

  constructor(
    private activityService: ActivityService,
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private validationMessageService: ValidationMessageService
  ) {
    this.buildForm();

    this.activityTypeOptions = [
      { label: "Appel", value: "Appel" },
      { label: "Diner", value: "Diner" },
      { label: "Email", value: "Email" },
      { label: "Comité de gestion", value: "Comité de gestion" },
      { label: "Réunion", value: "Réunion" },
      { label: "Note", value: "Note" },
    ];

    this.participantsOptions = this.contactService.contacts.map((c) => {
      return { label: c.fullName(), value: c };
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.activityForm.valid) {
      const values = this.activityForm.value;
      const newActivity = new Activity(
        values["date"],
        values["activityType"],
        values["participants"],
        values["note"],
        values["documents"],
        values["subject"]
      );

      this.activityService.addActivity(newActivity);

      this.router.navigate(["../", "list"], { relativeTo: this.route });
    }
  }

  getFormControl(controlName: string): FormControl {
    if (this.activityForm.contains(controlName))
      return this.activityForm.controls[controlName] as FormControl;

    return null;
  }

  getValidationMessages(state: any, fieldName: string) {
    return this.validationMessageService.getValidationMessages(
      state,
      fieldName
    );
  }

  private buildForm() {
    this.activityForm = this.fb.group({
      date: ["", Validators.required],
      activityType: ["", Validators.required],
      subject: [""],
      participants: [null],
      note: [""],
      documents: [null],
    });
  }
}
