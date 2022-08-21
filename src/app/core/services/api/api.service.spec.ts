import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
  beforeEach(() => {
    service = new ApiService(httpClientSpy);
  });

  it('should make api call', (done) => {
    const url =
      'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';
    httpClientSpy.get.and.returnValue(of({}));

    const response = service.get('contacts-mock-response/contacts');

    response.subscribe(() => {
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
      done();
    });
  });
});
