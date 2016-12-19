import { TestBed, inject } from '@angular/core/testing';
import { Auth0Service } from './auth0.service';
import { FakeBackend } from '../fake-backend';

describe('Auth0ServiceRefactored', () => {
  let subject: Auth0Service;
  let backend: FakeBackend;
  let responseForm = '<form />';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Auth0Service,
        FakeBackend.getProviders()
      ]
    });
  });

  beforeEach(inject([Auth0Service, FakeBackend], (auth0, fakeBackend) => {
    subject = auth0;
    backend = fakeBackend;
  }));

  it('should be called with proper arguments', (done) => {
    backend.expectPost(
      'https://blacksonic.eu.auth0.com.auth0.com/usernamepassword/login',
      {
        username: 'blacksonic',
        password: 'secret',
        client_id: 'YOUR_CLIENT_ID'
      },
      {
        'Content-Type': 'application/json'
      }
    ).respond(responseForm);

    subject.login('blacksonic', 'secret').subscribe((response) => {
      expect(response).toEqual(responseForm);
      done();
    });
  });
});
