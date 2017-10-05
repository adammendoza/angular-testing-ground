import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  const profileInfo = {
    login: 'blacksonic',
    id: 602571,
    name: 'Gábor Soós'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
  });

  it('should get profile data of user', () => {
    const githubService = TestBed.get(GithubService);
    const http = TestBed.get(HttpTestingController);
    let profileResponse;

    githubService.getProfile('blacksonic').subscribe((response) => {
      profileResponse = response;
    });

    http.expectOne('https://api.github.com/users/blacksonic').flush(profileInfo);
    expect(profileResponse).toEqual(profileInfo);
  });
});
