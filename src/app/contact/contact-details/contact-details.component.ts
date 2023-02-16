import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "src/app/models/contact.model";
import { ContactService } from "src/app/services/contact.service";

@Component({
  selector: "app-contact-details",
  templateUrl: "./contact-details.component.html",
  styleUrls: ["./contact-details.component.css"],
})
export class ContactDetailsComponent implements OnInit {
  isEditMode = false;
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.isEditMode = !isNaN(id);

    if (this.isEditMode) {
      this.contact = this.contactService.getContact(+id);
    }
  }
}
