import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectItem } from "primeng/components/common/selectitem";
import { Address } from "src/app/models/address.model";
import { Contact } from "src/app/models/contact.model";
import { ContactService } from "src/app/services/contact.service";
import { ValidationMessageService } from "src/app/services/validation-message.service";

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
  contact: Contact;

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
      this.contact = this.contactService.getContact(+id);
    } else {
      this.contact = new Contact("", "");
    }
  }

  onSubmit(f: NgForm) {
    this.isFormSubmitted = true;
    if (f.valid) {
      this.contact.firstName = f.value["firstName"];
      this.contact.lastName = f.value["lastName"];
      this.contact.email = f.value["email"];
      this.contact.phone = f.value["phone"];
      this.contact.jobTitle = f.value["jobTitle"];
      this.contact.company = f.value["company"];
      this.contact.contactOwner = f.value["contactOwner"];
      this.contact.address = new Address(
        f.value["city"],
        f.value["address"],
        f.value["country"],
        f.value["state"],
        +f.value["zip"]
      );

      if (this.isEditMode) {
        this.contactService.updateContact(this.contact);
      } else {
        this.contactService.addContact(this.contact);
      }

      this.router.navigateByUrl("/contacts/list");
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
    this.contactOwnerOptions = this.contactService.contacts.map((c) => {
      return { label: c.fullName(), value: c.fullName() };
    });
  }

  private buildJobTitleOptions(): void {
    this.jobTitleOptions = [
      { label: "CEO", value: "CEO" },
      { label: "Software Engineer", value: "Software Engineer" },
    ];
  }
}
