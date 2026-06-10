import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';
import { AuthService } from '../../services/auth.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  standalone: false,
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  userId: number = 0;
  userInvoices: Invoice[] = [];
  isLoading: boolean = false;
  selectedInvoice: Invoice | null = null;

  @ViewChild('invoicePdf', { static: false }) invoicePdf!: ElementRef;

  constructor(
    private invoiceService: InvoiceService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserIdByEmail().subscribe({
      next: (id: number) => {
        this.userId = id;
        this.fetchUserInvoices();
      },
      error: () => {
        this.toastr.error('No user is logged in or failed to fetch user ID.', 'Error');
      }
    });
  }

  fetchUserInvoices(): void {
    this.isLoading = true;
    this.invoiceService.getInvoices().subscribe({
      next: (invoices: Invoice[]) => {
        this.userInvoices = invoices.filter(inv => inv.userID === this.userId);
        this.isLoading = false;
        if (this.userInvoices.length === 0) {
          this.toastr.info('No invoices found for your account.', 'Info');
        }
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Failed to load invoices.', 'Error');
      }
    });
  }

  showInvoiceDetails(invoice: Invoice) {
    this.selectedInvoice = invoice;
    setTimeout(() => {
      // Scroll to invoice details for better UX
      const el = document.getElementById('invoice-detail-pdf');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  downloadPDF() {
    if (!this.invoicePdf) return;
    const options = {
      margin: 0,
      filename: `Invoice_${this.selectedInvoice?.invoiceID || 'download'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(this.invoicePdf.nativeElement).set(options).save();
  }
}