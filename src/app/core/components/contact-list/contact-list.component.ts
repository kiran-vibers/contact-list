import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactsService } from '../../services/contacts/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contactListArr: Contact[] = [];
  showEditForm = false;
  selectedContact: Contact;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.getContactsList();
  }

  getContactsList(): void {
    this.contactsService.getContactList().subscribe((data: Contact[]) => {
      this.contactListArr = data;
    });
  }

  trackContactById(index: number, item: Contact): number {
    return item.id;
  }

  editContact(contact: Contact): void {
    this.selectedContact = contact;
    this.showEditForm = true;
  }

  deleteContact(selectedContact: Contact): void {
    this.contactListArr = this.contactListArr.filter(
      (contact) => contact.id !== selectedContact.id
    );
  }

  onContactSave(selectedContact): void {
    this.showEditForm = false;
    if (!selectedContact.id) {
      selectedContact.id = this.contactListArr.length
        ? this.contactListArr.pop().id + 1
        : 1;
      this.contactListArr.push({ ...selectedContact });
    } else {
      Object.assign(this.selectedContact, selectedContact);
    }
  }
}
