import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectItem } from "primeng/components/common/selectitem";
import { Address } from "src/app/models/address.model";
import { ContactRequest, ContactResponse } from "src/app/models/contact.model";
import { ContactService } from "src/app/services/contact.service";
import { ValidationMessageService } from "src/app/services/validation-message.service";
import { catchError, map } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";

@Component({
  selector: "app-new-contact",
  templateUrl: "./new-contact.component.html",
  styleUrls: ["./new-contact.component.css"],
})
export class NewContactComponent implements OnInit {
  contactOwnerOptions: SelectItem[] = [];
  jobTitleOptions: SelectItem[] = [];
  isFormSubmitted = false;
  defaultPrevImgSrc =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  previewImgSrc = "";
  isEditMode = false;
  emailExists = false;
  contactReq: ContactRequest = new ContactRequest();
  contactRes: ContactResponse = new ContactResponse();

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private validationMessageService: ValidationMessageService
  ) {
    this.buildContactOwnerOptions();
    this.buildJobTitleOptions();
  }

  ngOnInit() {
    const id = this.route.parent.snapshot.params["id"];
    this.isEditMode = !isNaN(id);

    if (this.isEditMode) {
      this.contactService
        .getContact(+id)
        .subscribe((contact) => (this.contactRes = contact));
    }
  }

  onSubmit(f: NgForm) {
    this.isFormSubmitted = true;
    if (f.valid) {
      this.contactReq.id = this.contactRes.id;
      this.contactReq.firstName = f.value["firstName"];
      this.contactReq.lastName = f.value["lastName"];
      this.contactReq.email = f.value["email"];
      this.contactReq.phone = f.value["phone"];
      this.contactReq.jobTitle = f.value["jobTitle"];
      this.contactReq.company = f.value["company"];
      this.contactReq.contactOwnerId = f.value["contactOwner"];
      this.contactReq.address = new Address(
        this.contactRes.id,
        f.value["city"],
        f.value["address"],
        f.value["country"],
        f.value["state"],
        +f.value["zip"]
      );

      if (this.isEditMode) {
        this.contactService.updateContact(this.contactReq).subscribe({
          next: this.navigateToContactList.bind(this),
          error: this.handleErrors.bind(this),
        });
      } else {
        this.contactService.addContact(this.contactReq).subscribe({
          next: this.navigateToContactList.bind(this),
          error: this.handleErrors.bind(this),
        });
      }
    }
  }

  getValidationMessages(state: any, fieldName: string) {
    return this.validationMessageService.getValidationMessages(
      state,
      fieldName
    );
  }

  previewImg(files: FileList) {
    if (files.length === 0) return;

    let fileType = files[0].type;

    if (fileType.match(/image\/*/) == null) return;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      if (typeof reader.result === "string") this.previewImgSrc = reader.result;
    };
  }

  private buildContactOwnerOptions(): void {
    this.contactService
      .getContacts()
      .pipe(
        map((contacts) => {
          return contacts.map((c) => {
            return { label: `${c.firstName} ${c.lastName}`, value: c.id };
          });
        })
      )
      .subscribe((contacts) => (this.contactOwnerOptions = contacts));
  }

  private buildJobTitleOptions(): void {
    this.jobTitleOptions = [
      { label: "CEO", value: "CEO" },
      { label: "Software Engineer", value: "SOFTWARE_ENGINEER" },
    ];
  }

  private navigateToContactList(_: any) {
    this.router.navigateByUrl("/contacts/list");
  }

  handleErrors(err: any) {
    this.emailExists = err.status === 409;
  }
}
