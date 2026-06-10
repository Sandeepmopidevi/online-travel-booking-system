import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl = 'https://localhost:7193/api/Package';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPackages(): Observable<Package[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Package[]>(`${this.baseUrl}/GetPackages`, { headers });
  }

  searchPackages(name: string): Observable<Package[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Package[]>(
      `${this.baseUrl}/SearchPackages?name=${encodeURIComponent(name)}`,
      { headers }
    );
  }

  getPackageById(id: number): Observable<Package> {
    const headers = this.getAuthHeaders();
    return this.http.get<Package>(`${this.baseUrl}/GetPackage/${id}`, { headers });
  }

  createPackage(pkg: Package): Observable<Package> {
    const headers = this.getAuthHeaders();
    return this.http.post<Package>(`${this.baseUrl}/CreatePackage`, pkg, { headers });
  }

  updatePackage(id: number, pkg: Package): Observable<Package> {
    const headers = this.getAuthHeaders();
    return this.http.put<Package>(`${this.baseUrl}/UpdatePackage/${id}`, pkg, { headers });
  }

  deletePackage(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/DeletePackage/${id}`, { headers });
  }
}