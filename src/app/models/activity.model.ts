import { Contact } from "./contact.model";

export abstract class Activity {
  constructor(
    public id?: number,
    public date?: Date,
    public activityType?: string,
    public note?: string,
    public documents?: string[],
    public subject?: string
  ) {}
}

export class ActivityRequest extends Activity {
  constructor(
    id?: number,
    date?: Date,
    activityType?: string,
    note?: string,
    documents?: string[],
    subject?: string,
    public participantsIds?: number[]
  ) {
    super(id, date, activityType, note, documents, subject);
  }
}

export class ActivityResponse extends Activity {
  constructor(
    id?: number,
    date?: Date,
    activityType?: string,
    note?: string,
    documents?: string[],
    subject?: string,
    public participants?: Contact[]
  ) {
    super(id, date, activityType, note, documents, subject);
  }
}
