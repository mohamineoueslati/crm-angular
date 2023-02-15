import { Injectable } from "@angular/core";
import { Activity } from "../models/activity.model";
import { Contact } from "../models/contact.model";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  private _activities: Activity[] = [];

  constructor() {
    this._activities = [
      new Activity(
        new Date(),
        "Appel",
        [
          new Contact(
            "Moahmed Amine",
            "Oueslati",
            "moh@gmail.com",
            "+21625038057",
            "Software engineer",
            "ADS"
          ),
          new Contact(
            "Ghassen",
            "Kaaber",
            "ghassen@gmail.com",
            "+21626000000",
            "Software engineer",
            "ADS"
          ),
        ],
        [],
        []
      ),
    ];
  }

  addActivity(activity: Activity): void {
    this._activities.push(activity);
  }

  deleteActivity(id: number): void {
    const idx = this._activities.findIndex((a) => a.id === id);
    this._activities.splice(idx, 1);
  }

  get activities(): Activity[] {
    return this._activities;
  }
}
