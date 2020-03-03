import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

import { Contact } from '../../models/Contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  loaded: boolean = false;
  contacts: Contact[];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.loadedContacts.subscribe(contacts => {
      this.contacts = contacts;

      this.loaded = true;
    });
  }

  onEdit(contact: Contact) {
    this.contactService.editContact(contact);
  }

  onRemove(contact: Contact) {
    this.contactService.removeContact(contact);
  }

  contactState(contact: Contact) {
    return {
      'onDelete': contact.onDelete
    }
  }

}
