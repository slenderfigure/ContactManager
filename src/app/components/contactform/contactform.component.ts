import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

import { Contact } from '../../models/Contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  contact: Contact = {
    id: null,
    name: null,
    email: null, 
    phone: null
  }
  displayForm: boolean = false;
  loaded: boolean = true;
  updateState: boolean = false;

  addBtnDynamicContent = {
    icon: !this.displayForm ? 'person_add' : 'not_interested',
    text: !this.displayForm ? 'Add Contact' : 'Close Form',
  }

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    /** Checks if a contact will be update
     * using dual binding to fill each form's
     * respective field with the contact defails
     */
    this.contactService.contactToUpdate.subscribe(contact => {
      if (contact.id !== null) {
        this.updateState = true;
        this.contact = {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone
        }
        this.displayForm = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    this.loaded = false;
    
    if (!this.updateState) {
      // Async request faker 
      setTimeout(() => {
        this.contactService.addContact(this.contact);
        this.loaded = true;
        this.clearForm();
        form.resetForm();
      }, 500); 
    } else {
      // Async request faker 
      setTimeout(() => {
        this.contactService.updateContact(this.contact);
        this.loaded = true;
        this.displayForm = false;
        this.updateState = false;
        this.clearForm();
      }, 500); 
    }
  }

  clearForm() {
    // Reset form to its original state
    this.contact = {
      id: null,
      name: null,
      email: null, 
      phone: null
    }
  }

}
