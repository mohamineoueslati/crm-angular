import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private _contacts: Contact[] = [];

  constructor() {
    this._contacts = [
      new Contact(
        "Mohamed Amine",
        "Oueslati",
        "moh@gmail.com",
        "+21625038057",
        "Software engineer",
        "ADS",
        "Ghassen"
      ),
      new Contact(
        "Ghassen",
        "Kaaber",
        "ghassen@gmail.com",
        "+21626000000",
        "Software engineer",
        "ADS",
        "Mohamed Amine"
      ),
    ];
  }

  get contacts(): Contact[] {
    return this._contacts;
  }

  addContact(contact: Contact): void {
    this._contacts.push(contact);
  }

  getContact(id: number): Contact {
    return this._contacts.find((c) => c.id === id);
  }

  updateContact(contact: Contact): void {
    const idx = this._contacts.findIndex((c) => c.id === contact.id);
    this._contacts[idx] = contact;
  }

  deleteContact(id: number): void {
    const idx = this._contacts.findIndex((c) => c.id === id);
    this._contacts.splice(idx, 1);
  }
}
