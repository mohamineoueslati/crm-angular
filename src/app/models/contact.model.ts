import { Address } from "./address.model";

export class Contact {
  private _id: number;
  constructor(
    public firstName: string,
    public lastName: string,
    public email?: string,
    public phone?: string,
    public jobTitle?: string,
    public company?: string,
    public contactOwner?: string,
    public address?: Address
  ) {
    this._id = Math.floor(Math.random() * 1000);
  }

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get id(): number {
    return this._id;
  }
}
