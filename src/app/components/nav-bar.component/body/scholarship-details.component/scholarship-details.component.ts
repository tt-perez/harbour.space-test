import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Scholarship, ScholarshipService } from '../../../../services/scholarship.service';
import { formatDateString, formatTimeDifference } from '../../../../utils';

@Component({
  selector: 'app-scholarship-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scholarship-details.component.html',
  styleUrls:[ './scholarship-detail.component.css']
})
export class ScholarshipDetailComponent implements OnInit {

  scholarship: Scholarship | null = null;
  private destroyRef = inject(DestroyRef);
  
  constructor(private scholarshipService: ScholarshipService) {}

  ngOnInit(): void {
    this.scholarshipService.state$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        this.scholarship = state.data;
      });
    this.scholarshipService.loadScholarship();
  }


  formatDateString = formatDateString;
  formatTimeDifference = formatTimeDifference;
}
