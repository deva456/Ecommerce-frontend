import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse,  HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable()
export class Authinterceptor implements HttpInterceptor{
    constructor(private router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                tap(
                    (error: any) => {
                        if (error instanceof HttpErrorResponse) {
                            if (error.status === 401) {
                                localStorage.removeItem('token');
                                this.router.navigateByUrl('/login');
                            }
                            if (error.status === 404) {
                                this.router.navigateByUrl('/forbidden');
                            }
                            if (error.status === 0) {
                                this.router.navigateByUrl('/forbidden');
                            }
                            //etc
                        }
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
    }
