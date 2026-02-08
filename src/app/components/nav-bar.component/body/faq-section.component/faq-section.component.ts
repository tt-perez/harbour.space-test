import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScholarshipService, Scholarship } from '../../../../services/scholarship.service';

type FaqAnswer = {
  type: string;
  data: string;
};

type FaqItem = {
  type: string;
  question: string;
  answer: FaqAnswer[];
};

type ScholarshipWithFaqs = Scholarship & {
  faqs?: {
    items?: FaqItem[];
  };
};

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html'
})
export class FaqSectionComponent implements OnInit {
  isLoading = true;
  error: string | null = null;

  faqs: FaqItem[] = [];
  filteredFaqs: FaqItem[] = [];
  types: string[] = ['All'];
  selectedType = 'All';

  private openIndexes = new Set<number>();
  private destroyRef = inject(DestroyRef);

  constructor(private scholarshipService: ScholarshipService) {}

  ngOnInit(): void {
    this.scholarshipService.state$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        this.isLoading = state.loading;
        this.error = state.error;

        if (state.data) {
          const data = state.data as ScholarshipWithFaqs;
          const items = data.faqs?.items ?? [];
          this.faqs = items;
          this.types = ['All', ...Array.from(new Set(items.map(item => item.type).filter(Boolean)))];
          this.applyFilter();
        }
      });
    this.scholarshipService.loadScholarship();
  }

  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedType = target.value;
    this.applyFilter();
    this.openIndexes.clear();
  }

  toggle(index: number): void {
    if (this.openIndexes.has(index)) {
      this.openIndexes.delete(index);
      return;
    }
    this.openIndexes.add(index);
  }

  isOpen(index: number): boolean {
    return this.openIndexes.has(index);
  }

  private applyFilter(): void {
    if (this.selectedType === 'All') {
      this.filteredFaqs = this.faqs;
      return;
    }
    this.filteredFaqs = this.faqs.filter(item => item.type === this.selectedType);
  }
}
