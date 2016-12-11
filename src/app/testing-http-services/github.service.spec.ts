import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let subject: GithubService;
  let backend: MockBackend;
  let profileInfo = {
    login: 'blacksonic',
    id: 602571,
    name: 'Gábor Soós'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GithubService,
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

  beforeEach(inject([GithubService, MockBackend], (github: GithubService, mockBackend: MockBackend) => {
    subject = github;
    backend = mockBackend;
  }));

  it('should get profile data of user', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify(profileInfo)
      });

      connection.mockRespond(new Response(options));
    });

    subject.getProfile('blacksonic').subscribe((response) => {
      expect(response).toEqual(profileInfo);
      done();
    });
  });

  it('should be called with proper arguments', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('https://api.github.com/users/blacksonic');
      expect(connection.request.method).toEqual(RequestMethod.Get);

      let options = new ResponseOptions({
        body: JSON.stringify(profileInfo)
      });

      connection.mockRespond(new Response(options));
    });

    subject.getProfile('blacksonic').subscribe(() => { done(); });
  });
});
