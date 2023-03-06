import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ActivityRequest, ActivityResponse } from "../models/activity.model";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  private activitiesUrl = "activities";
  private contactsUrl = "contacts";

  constructor(private http: HttpClient) {}

  public getAllActivities(): Observable<ActivityResponse[]> {
    return this.http.get<ActivityResponse[]>(this.activitiesUrl);
  }

  public getActivitiesByIds(ids: number[]): Observable<ActivityResponse[]> {
    const params = new HttpParams().append("ids", ids.toString());
    return this.http.get<ActivityResponse[]>(this.activitiesUrl, {
      params: params,
    });
  }

  public getActivitiesByContactId(
    contactId: number
  ): Observable<ActivityResponse[]> {
    return this.http.get<ActivityResponse[]>(
      `${this.contactsUrl}/${contactId}/${this.activitiesUrl}`
    );
  }

  public getActivity(id: number): Observable<ActivityResponse> {
    return this.http.get<ActivityResponse>(`${this.activitiesUrl}/${id}`);
  }

  public addActivity(activity: ActivityRequest): Observable<ActivityResponse> {
    return this.http.post<ActivityResponse>(this.activitiesUrl, activity);
  }

  public updateActivity(
    activity: ActivityRequest
  ): Observable<ActivityResponse> {
    return this.http.put<ActivityResponse>(this.activitiesUrl, activity);
  }

  public deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.activitiesUrl}/${id}`);
  }
}
