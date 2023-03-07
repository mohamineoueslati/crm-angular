import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { Contact, ContactResponse } from "src/app/models/contact.model";
import { JobTitle } from "src/app/models/job-title.enum";
import { ContactService } from "src/app/services/contact.service";

@Component({
  selector: "app-list-contact",
  templateUrl: "./list-contact.component.html",
  styleUrls: ["./list-contact.component.css"],
})
export class ListContactComponent implements OnInit {
  contacts: ContactResponse[] = [];

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

    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  getContactFullName(contact: Contact): string {
    return this.contactService.getContactFullName(contact);
  }

  onDeleteContact(id: number): void {
    this.confirmationService.confirm({
      message: "Do you want to delete this contact?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.contactService
          .deleteContact(id)
          .subscribe((_) => this.removeContact(id));
      },
    });
  }

  jobTitle(e: string): string {
    if (e in JobTitle) return JobTitle[e];

    return;
  }

  private removeContact(id: number): void {
    const idx = this.contacts.findIndex((c) => c.id === id);
    this.contacts.splice(idx, 1);
  }
}
