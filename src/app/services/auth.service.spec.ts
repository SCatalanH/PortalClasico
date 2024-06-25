import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let platformIdSpy: any;
  let localStorageSpy: any;

  beforeEach(() => {
    platformIdSpy = 'browser'; // or 'server' if testing on the server
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: 'PLATFORM_ID', useValue: platformIdSpy },
        { provide: 'localStorage', useValue: localStorageSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set token in localStorage', () => {
    const mockResponse = { token: 'test.token.value' };
    const credentials = { email: 'test@test.com', password: 'password' };
    localStorageSpy.setItem.and.callThrough();

    service.login(credentials).subscribe(response => {
      expect(response.token).toBe(mockResponse.token);
      expect(localStorageSpy.setItem).toHaveBeenCalledWith('token', mockResponse.token);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should check if the user is authenticated', () => {
    localStorageSpy.getItem.and.returnValue('test.token.value');
    expect(service.isAuthenticated()).toBeTrue();
    expect(localStorageSpy.getItem).toHaveBeenCalledWith('token');
  });

  it('should return the current user as an observable', () => {
    const mockUser = { username: 'testuser' };
    service['currentUserSubject'].next(mockUser);

    service.getCurrentUser().subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should logout and remove token from localStorage', () => {
    localStorageSpy.removeItem.and.callThrough();
    service.logout();
    expect(localStorageSpy.removeItem).toHaveBeenCalledWith('token');
    service.getCurrentUser().subscribe(user => {
      expect(user).toBeNull();
    });
  });
});
