import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router'
import { CommonResponse } from '../models/core.models'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from './natification.service'

interface loginData {
  email: string
  password: string
  rememberMe: boolean
}
interface MeResponse {
  email: string
  id: string
  login: string
}

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  isAuth = false
  resolveAuthRequest: Function = () => {}

  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  //логинизация хочет емаил, пасворд и ремембер ми:
  login(data: Partial<loginData>) {
    //полное совпадение
    this.http
      .post<CommonResponse<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === 0) {
          this.router.navigate(['/'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  //Логаут это метод делит и ничего передавать не нужно
  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === 0) {
          this.router.navigate(['/login'])
        }
      })
  }
  //me:я это или не я
  me() {
    this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === 0) {
          this.isAuth = true
        }
        this.resolveAuthRequest()
      })
  }
  private errorHandler(err: HttpErrorResponse) {
    // console.log(err.message)
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
