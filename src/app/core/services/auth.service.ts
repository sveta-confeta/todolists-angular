import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router'
import { CommonResponse } from '../models/core.models'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  //логинизация хочет емаил, пасворд и ремембер ми:
  login(data: any) {
    this.http
      .post<CommonResponse<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .subscribe(res => {
        if (res.resultCode === 0) {
          this.router.navigate(['/'])
        }
      })
  }

  //Логаут это метод делит и ничего передавать не нужно
  logout() {
    this.http.delete<CommonResponse>(`${environment.baseUrl}/auth/login`).subscribe(res => {
      if (res.resultCode === 0) {
        this.router.navigate(['/login'])
      }
    })
  }
  //me:я это или не я
  me() {
    this.http.get(`${environment.baseUrl}/auth/me`).subscribe(res => {})
  }
}
