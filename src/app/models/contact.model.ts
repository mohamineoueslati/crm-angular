import { Address } from "./address.model";

export abstract class Contact {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phone?: string,
    public jobTitle?: string,
    public company?: string,
    public address?: Address
  ) {}
}

export class ContactRequest extends Contact {
  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    jobTitle?: string,
    company?: string,
    address?: Address,
    public contactOwnerId?: number
  ) {
    super(id, firstName, lastName, email, phone, jobTitle, company, address);
  }
}

export class ContactResponse extends Contact {
  constructor(
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    jobTitle?: string,
    company?: string,
    address?: Address,
    public contactOwner?: ContactResponse,
    public activitiesIds?: number[]
  ) {
    super(id, firstName, lastName, email, phone, jobTitle, company, address);
  }
}
