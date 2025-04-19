import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackageItineraryService {
  private packages: any[] = [];
  private itineraries: any[] = [];

  addPackage(pkg: any): void {
    this.packages.push(pkg);
  }

  getPackages(): any[] {
    return this.packages;
  }

  addItinerary(itinerary: any): void {
    this.itineraries.push(itinerary);
  }

  getItineraries(): any[] {
    return this.itineraries;
  }
}