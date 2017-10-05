import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class Auth0Service {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(
        'https://blacksonic.eu.auth0.com.auth0.com/usernamepassword/login',
        { username, password, client_id: 'YOUR_CLIENT_ID' },
        { headers }
      );
  }
}