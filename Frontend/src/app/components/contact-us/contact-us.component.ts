import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { ContactUsService } from '../../services/contact-us.service';

@Component({
  standalone: false,
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private contactUsService: ContactUsService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  // Submit the contact form
  onSubmit(form: any): void {
    if (form.valid) {
      this.contactUsService.postMessage(form.value).subscribe(
        () => {
          this.toastr.success('Thank you for contacting us!', 'Success'); // Success notification
          form.reset();
        },
        (error) => {
          console.error('Error: Unable to submit your message. Please try again later.', error);
          this.toastr.error('Unable to submit your message. Please try again later.', 'Error'); // Error notification
        }
      );
    } else {
      this.toastr.warning('Please fill out all required fields.', 'Validation Error'); // Validation error notification
    }
  }
}