import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContactResponse } from "src/app/models/contact.model";
import { ContactService } from "src/app/services/contact.service";

@Component({
  selector: "app-contact-details",
  templateUrl: "./contact-details.component.html",
  styleUrls: ["./contact-details.component.css"],
})
export class ContactDetailsComponent implements OnInit {
  isEditMode = false;
  contact: ContactResponse = new ContactResponse();

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.isEditMode = !isNaN(id);

    if (this.isEditMode) {
      this.contactService.getContact(+id).subscribe((contact) => {
        this.contact = contact;
      });
    }
  }

  getContactFullName(): string {
    return this.contactService.getContactFullName(this.contact);
  }
}
