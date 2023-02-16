import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { Contact } from "src/app/models/contact.model";
import { ContactService } from "src/app/services/contact.service";

@Component({
  selector: "app-list-contact",
  templateUrl: "./list-contact.component.html",
  styleUrls: ["./list-contact.component.css"],
})
export class ListContactComponent implements OnInit {
  contacts: Contact[] = [];

  cols: { field: string; header: string }[];

  constructor(
    private contactService: ContactService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      { field: "company", header: "Company" },
      { field: "jobTitle", header: "Job Title" },
      { field: "email", header: "Email" },
      { field: "phone", header: "Phone" },
      { field: "contactOwner", header: "Contact Owner" },
    ];

    this.contacts = this.contactService.contacts;
  }

  onDeleteContact(id: number): void {
    this.confirmationService.confirm({
      message: "Do you want to delete this contact?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.contactService.deleteContact(id);
      },
    });
  }
}