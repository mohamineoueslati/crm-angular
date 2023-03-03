import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ActivityRequest, ActivityResponse } from "../models/activity.model";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  private url = "activities";

  constructor(private http: HttpClient) {}

  public getAllActivities(): Observable<ActivityResponse[]> {
    return this.http.get<ActivityResponse[]>(this.url);
  }

  public getActivitiesByIds(ids: number[]): Observable<ActivityResponse[]> {
    const params = new HttpParams().append("ids", ids.toString());
    return this.http.get<ActivityResponse[]>(this.url, {
      params: params,
    });
  }

  public getActivity(id: number): Observable<ActivityResponse> {
    return this.http.get<ActivityResponse>(`${this.url}/${id}`);
  }

  public addActivity(activity: ActivityRequest): Observable<ActivityResponse> {
    return this.http.post<ActivityResponse>(this.url, activity);
  }

  public updateActivity(
    activity: ActivityRequest
  ): Observable<ActivityResponse> {
    return this.http.put<ActivityResponse>(this.url, activity);
  }

  public deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
