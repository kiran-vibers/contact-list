import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-add-edit-contact-form',
  templateUrl: './add-edit-contact-form.component.html',
  styleUrls: ['./add-edit-contact-form.component.scss'],
})
export class AddEditContactFormComponent implements OnInit {
  contactForm: FormGroup;
  @Input() contact: Contact;
  @Output() saveContact = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildContactFrom();
  }

  buildContactFrom() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      id: [''],
    });
    if (this.contact?.id) {
      this.patchContactForm();
    }
  }

  patchContactForm() {
    this.contactForm.patchValue({
      firstName: this.contact.firstName,
      lastName: this.contact.lastName,
      phone: this.contact.phone,
      id: this.contact.id,
    });
  }

  onSaveContact() {
    this.saveContact.emit(this.contactForm.value);
  }
}
