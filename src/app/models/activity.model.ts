import { Contact } from "./contact.model";

export class Activity {
  private _id: number;

  constructor(
    public date: Date,
    public activityType: string,
    public participants: Contact[],
    public note: string[],
    public documents: string[],
    public subject?: string
  ) {
    this._id = Math.floor(Math.random() * 1000);
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }
}
