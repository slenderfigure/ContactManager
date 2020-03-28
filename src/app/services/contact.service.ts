import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from '../models/Contact';

const headerOptions = new HttpHeaders({'Content-type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[];
  contact: Contact = {
    id: null,
    name: null,
    email: null, 
    phone: null,
    isNew: false
  }
  private url: string = 'https://jsonplaceholder.typicode.com/users';

  private retrievedContacts = new BehaviorSubject<Contact[]>([]);
  loadedContacts = this.retrievedContacts.asObservable();

  private cachedContact = new BehaviorSubject<Contact>(this.contact);
  contactToUpdate = this.cachedContact.asObservable();

  constructor(private http: HttpClient) { 
    /** If localStorage does not exist,
     * the data will then be fetched from the specified URL
     * Otherwise, the data will be load from the 
     * localStorage
     */
    this.loadContacts();
  }

  loadContacts() {
    if (!localStorage.getItem('ContactManager')) {
      this.http.get<Contact[]>(this.url, {headers: headerOptions})
        .subscribe(data => {
          this.retrievedContacts.next(data);
          this.contacts = data;

          this.setDefaultAvatar();
        });
    } else {
      this.contacts = JSON.parse(localStorage.getItem('ContactManager'));
      this.retrievedContacts.next(this.contacts);
    }
  }

  addContact(contact: Contact) {
    contact.id = this.generateId();
    this.setDefaultAvatar(true, contact);
    this.contacts.unshift(contact);

    localStorage.setItem('ContactManager', JSON.stringify(this.contacts));
  }

  editContact(contact: Contact) {
    this.cachedContact.next(contact);
  }

  updateContact(contact: Contact) {
    const index = this.contacts.findIndex(cur => cur.id == contact.id);
    this.contacts.splice(index, 1);

    this.contacts.unshift(contact);
    this.setDefaultAvatar(true, contact);

    localStorage.setItem('ContactManager', JSON.stringify(this.contacts));
  }

  removeContact(contact: Contact) {
    // Async request faker
    if(confirm('Are you sure you\'d like to proceed?')) {
      contact.onDelete = true;
      
      setTimeout(() => {
        const index = this.contacts.findIndex(cur => cur.id == contact.id);
        this.contacts.splice(index, 1);
  
        localStorage.setItem('ContactManager', JSON.stringify(this.contacts));
      }, 500);
    }
  }

  generateId() {
    // Generates a unique key
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  setDefaultAvatar(multiple: boolean = false, contact?: Contact) {
    /**Generates a default contact avatar 
     * with the first the first two contact name initials 
     */
    let formatting = (contact) => {
      const colorPalette = ['#40c50b', '#1d77ff', '#fc8626', '#da2076', '#f83a3a'];
      let rand = Math.floor(Math.random() * colorPalette.length);
        
      contact.nameInitials = 
        contact.name.split(' ').filter((val, i) => {
          if (i < 2) return val;
        }).map(val => val.slice(0, 1)).join('');

      contact.defaultAvatar = colorPalette[rand];
    }

    /** Checks whether the fun will run for all contacts
     * or a single contact, determined by the fun's params
     */
    if (!multiple) {
      this.contacts.map(contact => {
        formatting(contact);
      });
    } else {
      formatting(contact);
    }
  }
}
