import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import {
  Contact,
  ContactRequest,
  ContactResponse,
} from "../models/contact.model";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private url = "contacts";

  public $publishContactActivitiesIds: BehaviorSubject<number[]> =
    new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  public getContacts(): Observable<ContactResponse[]> {
    return this.http.get<ContactResponse[]>(this.url);
  }

  public getContact(id: number): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${this.url}/${id}`);
  }

  public addContact(contact: ContactRequest): Observable<ContactResponse> {
    return this.http.post(this.url, contact);
  }

  public updateContact(contact: ContactRequest): Observable<ContactResponse> {
    return this.http.put<ContactResponse>(this.url, contact);
  }

  public deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  public getContactFullName(contact: Contact): string {
    return contact ? `${contact.firstName} ${contact.lastName}` : "";
  }
}
