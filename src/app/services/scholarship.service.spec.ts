import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  ApiResponse,
  Scholarship,
  ScholarshipService,
  ScholarshipState,
  SCHOLARSHIP_API_URL
} from './scholarship.service';

describe('ScholarshipService', () => {
  let service: ScholarshipService;
  let httpMock: HttpTestingController;

  const mockScholarship: Scholarship = {
    scope: 'test',
    id: 123,
    name: 'Data Science Apprenticeship',
    description: [{ type: 'text', data: 'Test description' }],
    location: {
      id: 1,
      name: 'Barcelona',
      longitude: 2.1734,
      latitude: 41.3851,
      description: 'Test location',
      country_id: 34,
      acronym: 'BCN'
    },
    scholarship_start_date: '2026-01-01',
    application_end_date: '2026-02-01',
    duration: 12,
    position: 'Apprentice'
  };

  const mockResponse: ApiResponse = {
    id: 999,
    scope: 'test',
    slug: 'data-science-apprenticeship-zeptolab',
    is_published: true,
    scholarship: mockScholarship
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScholarshipService]
    });

    service = TestBed.inject(ScholarshipService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update state on successful load', () => {
    const states: ScholarshipState[] = [];
    service.state$.subscribe((state) => states.push(state));

    service.loadScholarship();

    expect(states[states.length - 1].loading).toBeTrue();
    const req = httpMock.expectOne(SCHOLARSHIP_API_URL);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    const last = states[states.length - 1];
    expect(last.loading).toBeFalse();
    expect(last.error).toBeNull();
    expect(last.data?.id).toBe(mockScholarship.id);
  });

  it('should update state on error', () => {
    const states: ScholarshipState[] = [];
    service.state$.subscribe((state) => states.push(state));

    service.loadScholarship();

    const req = httpMock.expectOne(SCHOLARSHIP_API_URL);
    req.flush('Server error', { status: 500, statusText: 'Server Error' });

    const last = states[states.length - 1];
    expect(last.loading).toBeFalse();
    expect(last.data).toBeNull();
    expect(last.error).toBe('Failed to load scholarship data. Please try again later.');
  });
});
