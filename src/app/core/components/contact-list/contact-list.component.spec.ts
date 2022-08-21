import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContactsService } from '../../services/contacts/contacts.service';

import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  const contactsServiceSpy = jasmine.createSpyObj('ContactsService', [
    'getContactList',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      providers: [{ provide: ContactsService, useValue: contactsServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    contactsServiceSpy.getContactList.and.returnValue(of([mockContact]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getContactsList', () => {
    spyOn(component, 'getContactsList');

    component.ngOnInit();

    expect(component.getContactsList).toHaveBeenCalled();
  });

  it('should get contactsList', () => {
    component.getContactsList();

    expect(component.contactListArr).toEqual([mockContact]);
    expect(contactsServiceSpy.getContactList).toHaveBeenCalled();
  });

  it('should get id for tracking', () => {
    const result = component.trackContactById(0, mockContact);

    expect(result).toBe(1);
  });

  it('should set contact and edit form flag', () => {
    component.editContact(mockContact);

    expect(component.showEditForm).toBeTruthy();
    expect(component.selectedContact).toEqual(mockContact);
  });

  it('should delete contact on call', () => {
    component.contactListArr = [mockContact, mockEditContact];

    component.deleteContact(mockEditContact);

    expect(component.contactListArr).toEqual([mockContact]);
  });

  describe('#onContactSave', () => {
    it('should save contact when its edited', () => {
      component.selectedContact = mockContact;
      component.contactListArr = [mockContact];

      component.onContactSave({ ...mockEditContact, id: 1 });

      expect(component.contactListArr).toEqual([{ ...mockEditContact, id: 1 }]);
    });

    it('should save contact when its new contact', () => {
      component.contactListArr = [mockContact];

      component.onContactSave({ ...mockEditContact, id: null });

      expect(component.contactListArr).toEqual([
        { ...mockEditContact, ...mockEditContact },
      ]);
    });

    it('should save contact when its new contact and contactListArr is empty', () => {
      component.contactListArr = [];

      component.onContactSave({ ...mockContact, id: null });

      expect(component.contactListArr).toEqual([{ ...mockContact }]);
    });
  });

  const mockContact = {
    firstName: 'Amit',
    lastName: 'Roy',
    phone: '9876543210',
    id: 1,
  };

  const mockEditContact = {
    firstName: 'Aakash',
    lastName: 'Choudhury',
    phone: '9876584431',
    id: 2,
  };
});
