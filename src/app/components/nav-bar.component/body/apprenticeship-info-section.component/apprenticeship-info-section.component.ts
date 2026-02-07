import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ScholarshipService, Scholarship, ScholarshipData } from '../../../../services/scholarship.service';
import { InfoCellComponent } from './info-cell.component';

interface CombinedScholarshipData extends Scholarship {
  about?: ScholarshipData['about'];
  total_value?: ScholarshipData['total_value'];
  tuition?: ScholarshipData['tuition'];
  remaining?: ScholarshipData['remaining'];
  stipend_per_year?: ScholarshipData['stipend_per_year'];
  stipend_per_month?: ScholarshipData['stipend_per_month'];
  study_commitment?: ScholarshipData['study_commitment'];
  study_commitment_text?: ScholarshipData['study_commitment_text'];
  work_commitment?: ScholarshipData['work_commitment'];
  internship_commitment_text?: ScholarshipData['internship_commitment_text'];
}

@Component({
  selector: 'app-apprenticeship-info-section',
  templateUrl: './apprenticeship-info-section.component.html',
  standalone: true,
  imports: [CommonModule, InfoCellComponent]
})
export class ApprenticeshipInfoSectionComponent implements OnInit {
  scholarshipData: CombinedScholarshipData | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(private scholarshipService: ScholarshipService) { }

  ngOnInit(): void {
    this.fetchScholarshipData();
  }

  private fetchScholarshipData(): void {
    this.scholarshipService.getScholarship().subscribe({
      next: (response: Scholarship) => {
        this.scholarshipData = response;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Failed to load scholarship data. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching scholarship data:', err);
      }
    });
  }

  formatNumber(value: number | undefined): string {
    return value ? value.toLocaleString('es-ES') : '0';
  }
}
