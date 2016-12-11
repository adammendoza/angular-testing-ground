import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Auth0Service } from './auth0.service';

describe('GithubService', () => {
  let subject: Auth0Service;
  let backend: MockBackend;
  let responseForm = '<form />';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Auth0Service,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, defaultOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  beforeEach(inject([Auth0Service, MockBackend], (auth0, mockBackend) => {
    subject = auth0;
    backend = mockBackend;
  }));

  it('should be called with proper arguments', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('https://blacksonic.eu.auth0.com.auth0.com/usernamepassword/login');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      expect(connection.request.getBody()).toEqual(JSON.stringify(
        {
          username: 'blacksonic',
          password: 'secret',
          client_id: 'YOUR_CLIENT_ID'
        }, null, 2
      ));
      expect(connection.request.detectContentType()).toEqual(ResponseContentType.Json);

      let options = new ResponseOptions({
        body: responseForm
      });

      connection.mockRespond(new Response(options));
    });

    subject.login('blacksonic', 'secret').subscribe((response) => {
      expect(response).toEqual(responseForm);
      done();
    });
  });
});
