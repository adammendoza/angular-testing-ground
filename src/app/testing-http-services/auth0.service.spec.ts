import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Auth0Service } from './auth0.service';
import { HttpRequest } from '@angular/common/http';

describe('Auth0Service', () => {
  const responseForm = '<form />';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Auth0Service]
    });
  });

  it('should be called with proper arguments', () => {
    const auth0Service = TestBed.get(Auth0Service);
    const http = TestBed.get(HttpTestingController);
    let loginResponse;

    auth0Service.login('blacksonic', 'secret').subscribe((response) => {
      loginResponse = response;
    });

    http.expectOne({
      url: 'https://blacksonic.eu.auth0.com.auth0.com/usernamepassword/login',
      method: 'POST'
    }).flush(responseForm);
    expect(loginResponse).toEqual(responseForm);
  });

  it('should be called with proper arguments and headers plus body', () => {
    const auth0Service = TestBed.get(Auth0Service);
    const http = TestBed.get(HttpTestingController);
    let loginResponse;

    auth0Service.login('blacksonic', 'secret').subscribe((response) => {
      loginResponse = response;
    });

    http.expectOne((request: HttpRequest<any>) => {
      return request.method == 'POST'
        && request.url == 'https://blacksonic.eu.auth0.com.auth0.com/usernamepassword/login'
        && JSON.stringify(request.body) === JSON.stringify({
          username: 'blacksonic', password: 'secret', client_id: 'YOUR_CLIENT_ID'
        })
        && request.headers.get('Content-Type') === 'application/json';
    }).flush(responseForm);
    expect(loginResponse).toEqual(responseForm);
  });
});
