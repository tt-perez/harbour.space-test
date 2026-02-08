import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, catchError, map, Observable, tap } from 'rxjs';

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
  description: Array<{ type: string; data: string }>;
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

export interface ScholarshipState {
  data: Scholarship | null;
  loading: boolean;
  error: string | null;
}

export const SCHOLARSHIP_API_URL =
  'https://pre-prod.harbour.space/api/v1/scholarship_pages/data-science-apprenticeship-zeptolab';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipService {
  private stateSubject = new BehaviorSubject<ScholarshipState>({
    data: null,
    loading: false,
    error: null
  });
  readonly state$ = this.stateSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadScholarship(): void {
    const current = this.stateSubject.value;
    if (current.loading || current.data) {
      return;
    }

    this.stateSubject.next({
      data: current.data,
      loading: true,
      error: null
    });

    this.getScholarship()
      .pipe(
        tap((scholarship) => {
          this.stateSubject.next({
            data: scholarship,
            loading: false,
            error: null
          });
        }),
        catchError(() => {
          this.stateSubject.next({
            data: null,
            loading: false,
            error: 'Failed to load scholarship data. Please try again later.'
          });
          return EMPTY;
        })
      )
      .subscribe();
  }

  getScholarship(): Observable<Scholarship> {
    return this.http.get<ApiResponse>(SCHOLARSHIP_API_URL).pipe(
      map((response) => response.scholarship)
    );
  }
}
