import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FlightsService } from '../../services/flights.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  standalone: false,
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  flights: any[] = [];
  filteredFlights: any[] = [];
  newFlight: any = this.resetFlightForm();
  editingFlight: any = null;
  searchCriteria = { boardingCity: '', destinationCity: '' };

  constructor(
    private flightsService: FlightsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightsService.getAllFlights().subscribe(
      (data) => {
        this.flights = data;
        this.filteredFlights = data;
      },
      (error) => {
        console.error('Failed to fetch flights', error);
        this.toastr.error('Failed to load flights. Please try again.', 'Error');
      }
    );
  }

  searchFlights(): void {
    const { boardingCity, destinationCity } = this.searchCriteria;
    if (!boardingCity.trim() && !destinationCity.trim()) {
      this.filteredFlights = this.flights;
      this.toastr.info('Search criteria is empty. Showing all flights.', 'Info');
      return;
    }

    this.flightsService.searchFlights(boardingCity, destinationCity).subscribe(
      (data) => {
        this.filteredFlights = data;
        if (data.length === 0) {
          this.toastr.warning('No flights found for the given criteria.', 'Warning');
        } else {
          this.toastr.success('Flights found!', 'Success');
        }
      },
      () => {
        this.filteredFlights = [];
        console.error('Failed to search flights.');
        this.toastr.error('Failed to search flights. Please try again.', 'Error');
      }
    );
  }

  addFlight(): void {
    this.flightsService.createFlight(this.newFlight).subscribe(
      (data) => {
        this.flights.push(data);
        this.filteredFlights = this.flights;
        this.toastr.success('Flight added successfully!', 'Success');
        this.newFlight = this.resetFlightForm();
      },
      () => {
        console.error('Failed to add flight');
        this.toastr.error('Failed to add flight. Please try again.', 'Error');
      }
    );
  }

  editFlight(flight: any): void {
    this.editingFlight = { ...flight };
  }

  updateFlight(): void {
    if (!this.editingFlight) return;
    this.flightsService.updateFlight(this.editingFlight.flightID, this.editingFlight).subscribe(
      (data) => {
        const index = this.flights.findIndex((f) => f.flightID === this.editingFlight.flightID);
        if (index !== -1) {
          this.flights[index] = data;
        }
        this.filteredFlights = [...this.flights];
        this.toastr.success('Flight updated successfully!', 'Success');
        this.editingFlight = null;
      },
      () => {
        console.error('Failed to update flight');
        this.toastr.error('Failed to update flight. Please try again.', 'Error');
      }
    );
  }

  deleteFlight(flightID: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This flight will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.flightsService.deleteFlight(flightID).subscribe(
          () => {
            this.flights = this.flights.filter((f) => f.flightID !== flightID);
            this.filteredFlights = [...this.flights];
            this.toastr.success('Flight has been deleted.', 'Success');
          },
          () => {
            console.error('Failed to delete flight');
            this.toastr.error('Failed to delete flight. Please try again.', 'Error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Deletion cancelled.', 'Info');
      }
    });
  }

  cancelEdit(): void {
    this.editingFlight = null;
  }

  private resetFlightForm() {
    return {
      airline: '',
      flightNumber: '',
      boardingCity: '',
      destinationCity: '',
      departure: '',
      arrival: '',
      price: 0,
      availability: true,
    };
  }
}