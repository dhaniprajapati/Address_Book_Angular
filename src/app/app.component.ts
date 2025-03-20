import { Component } from '@angular/core';
import { ContactService } from './services/contact.service';
import { Contact } from './models/contact.model';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgFor,NgIf, FormsModule]
})
export class AppComponent {
  contacts: Contact[] = [];
  contact: Contact = { id:0,name: '', email: '', phone: '', address: '' };
  isEdit: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  addOrUpdateContact() {
    if (this.isEdit) {
      this.updateContact();
    } else {
      this.addContact();
    }
  }

  addContact() {
    this.contactService.addContact(this.contact).subscribe(() => {
      this.resetForm();
      this.loadContacts();
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(() => this.loadContacts());
  }

  editContact(contact: Contact) {
    this.contact = { ...contact };
    this.isEdit = true;
  }

  updateContact() {
    this.contactService.updateContact(this.contact).subscribe(() => {
      this.resetForm();
      this.loadContacts();
    });
  }

  resetForm() {
    this.contact = { id: 0, name: '', email: '', phone: '', address: '' };
    this.isEdit = false;
  }
}