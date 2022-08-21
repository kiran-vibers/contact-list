import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
  beforeEach(() => {
    service = new ContactsService(httpClientSpy);
  });

  it('should make api call to get contacts', (done) => {
    const url =
      'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';
    const mockResponse = [
      {
        firstName: 'Amit',
        lastName: 'Roy',
        phone: '9876543210',
        id: 1,
      },
    ];
    httpClientSpy.get.and.returnValue(of(mockResponse));

    const contactsResponse = service.getContactList();

    contactsResponse.subscribe((data) => {
      expect(data).toEqual(mockResponse);
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
      done();
    });
  });
});
