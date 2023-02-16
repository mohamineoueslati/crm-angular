import { Injectable } from "@angular/core";
import { Activity } from "../models/activity.model";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  private _activities: Activity[] = [];

  constructor() {
    this._activities = [new Activity(new Date(), "Appel", [], [], [])];
  }

  addActivity(activity: Activity): void {
    this._activities.push(activity);
  }

  getActivity(id: number): Activity {
    return this._activities.find((a) => a.id === id);
  }

  updateActivity(activity: Activity): void {
    const idx = this._activities.findIndex((a) => a.id === activity.id);
    this._activities[idx] = activity;
  }

  deleteActivity(id: number): void {
    const idx = this._activities.findIndex((a) => a.id === id);
    this._activities.splice(idx, 1);
  }

  get activities(): Activity[] {
    return this._activities;
  }
}
