import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { GithubService } from './github.service';
import { FakeBackend } from './fake-backend';

describe('GithubServiceRefactored', () => {
  let subject: GithubService;
  let backend: FakeBackend;
  let profileInfo = {
    login: 'blacksonic',
    id: 602571,
    name: 'Gábor Soós'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GithubService,
        FakeBackend.getProviders()
      ]
    });
  });

  beforeEach(inject([GithubService, FakeBackend], (github, fakeBackend) => {
    subject = github;
    backend = fakeBackend;
  }));

  afterEach(() => {
    backend.verifyNoPendingRequests();
  });

  it('should get profile data of user 1', (done) => {
    backend
      .expectGET('https://api.github.com/users/blacksonic')
      .respond(JSON.stringify(profileInfo));

    subject.getProfile('blacksonic').subscribe((response) => {
      expect(response).toEqual(profileInfo);
      done();
    });
  });

  it('should get profile data of user 2', (done) => {
    backend
      .expectGET('https://api.github.com/users/blacksonic')
      .respond(JSON.stringify(profileInfo));

    subject.getProfile('blacksonic').subscribe((response) => {
      expect(response).toEqual(profileInfo);
      done();
    });
  });

  // it('should be called with proper arguments', (done) => {
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     expect(connection.request.url).toEqual('https://api.github.com/users/blacksonic');
  //     expect(connection.request.method).toEqual(RequestMethod.Get);
  //
  //     let options = new ResponseOptions({
  //       body: JSON.stringify(profileInfo)
  //     });
  //
  //     connection.mockRespond(new Response(options));
  //   });
  //
  //   subject.getProfile('blacksonic').subscribe(() => { done(); });
  // });
});
