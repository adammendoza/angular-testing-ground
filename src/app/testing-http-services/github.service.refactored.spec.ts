import { TestBed, inject } from '@angular/core/testing';
import { GithubService } from './github.service';
import { FakeBackend } from 'ngx-http-test';

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

  it('should get profile data of user', (done) => {
    backend
      .expectGet('https://api.github.com/users/blacksonic')
      .respond(profileInfo);

    subject.getProfile('blacksonic').subscribe((response) => {
      expect(response).toEqual(profileInfo);
      done();
    });
  });
});
