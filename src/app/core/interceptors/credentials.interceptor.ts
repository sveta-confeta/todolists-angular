import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

export class CredentialsInterceptor implements HttpInterceptor{
  constructor() {
  }
  intercept(request:HttpRequest<unknown>,next:HttpHandler):Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers:new HttpHeaders().append('api-key', environment['api-key']),
      withCredentials:true,
    })
    return next.handle(request)
  }
}
