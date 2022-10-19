import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  //логинизация хочет емаил, пасворд и ремембер ми:
  login(data: any) {
    this.http.post(`${environment.baseUrl}/auth/login`, data).subscribe(res => {})
  }

  //Логаут это метод делит и ничего передавать не нужно
  logout() {
    this.http.delete(`${environment.baseUrl}/auth/login`).subscribe(res => {})
  }
  //me:я это или не я
  me() {
    this.http.get(`${environment.baseUrl}/auth/me`).subscribe(res => {})
  }
}
