import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiInterceptorService implements HttpInterceptor {
  private baseUrl = environment.baseUrl;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let httpReq: HttpRequest<any>;
    httpReq = req.clone({ url: `${this.baseUrl}/${req.url}` });

    return next.handle(httpReq);
  }
}
