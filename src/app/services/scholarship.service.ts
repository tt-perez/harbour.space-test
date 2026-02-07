import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// interfaces
export interface ApiResponse {
  id: number;
  scope: string;
  slug: string;
  is_published: boolean;
  scholarship: Scholarship;
}

export interface Scholarship {
  scope: string;
  id: number;
  name: string;
  description: Array<{type: string, data: string}>;
  location: {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    description: string;
    country_id: number;
    acronym: string;
  };
  scholarship_start_date: string;
  application_end_date: string;
  duration: number;
  position: string;
}

export interface ScholarshipData {
  about: AboutItem[];
  total_value: number;
  tuition: number;
  remaining: number;
  stipend_per_year: number;
  stipend_per_month: number;
  study_commitment: number;
  study_commitment_text: string;
  work_commitment: number;
  internship_commitment_text: string;
}

export interface AboutItem {
  type: string;
  data: string;
}


@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {
  private apiUrl = 'https://pre-prod.harbour.space/api/v1/scholarship_pages/data-science-apprenticeship-zeptolab';

  constructor(private http: HttpClient) {}

  getScholarship(): Observable<Scholarship> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        //console.log('Datos extraídos:', response.scholarship);
        return response.scholarship;
      })
    );
  }}
