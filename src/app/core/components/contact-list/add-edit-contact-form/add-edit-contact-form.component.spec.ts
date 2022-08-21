import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AddEditContactFormComponent } from './add-edit-contact-form.component';

describe('AddEditContactFormComponent', () => {
  let component: AddEditContactFormComponent;
  let fixture: ComponentFixture<AddEditContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditContactFormComponent],
      providers: [FormBuilder],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form', () => {
    component.contact = mockContact;
    spyOn(component, 'patchContactForm');

    component.buildContactFrom();

    expect(component.contactForm).toBeDefined();
    expect(component.patchContactForm).toHaveBeenCalled();
  });

  it('should call buildContactFrom', () => {
    spyOn(component, 'buildContactFrom');

    component.ngOnInit();

    expect(component.buildContactFrom).toHaveBeenCalled();
  });

  it('should set value to form on call', () => {
    component.contact = mockContact;

    component.patchContactForm();

    expect(component.contactForm.value).toEqual(mockContact);
  });

  it('should emit value on call', () => {
    spyOn(component.saveContact, 'emit');

    component.onSaveContact();

    expect(component.saveContact.emit).toHaveBeenCalled();
  });

  const mockContact = {
    firstName: 'Amit',
    lastName: 'Roy',
    phone: '9876543210',
    id: 1,
  };
});
