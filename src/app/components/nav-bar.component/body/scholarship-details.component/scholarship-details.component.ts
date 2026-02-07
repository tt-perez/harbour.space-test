import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  
  constructor(private scholarshipService: ScholarshipService) {}

  ngOnInit(): void {
 
    this.scholarshipService.getScholarship().subscribe({
      next: (data) => {
        this.scholarship = data;
      },
      error: (error) => {
        console.error('Error al obtener los datos de la beca:', error);
      }
    });
  }


  formatDateString = formatDateString;
  formatTimeDifference = formatTimeDifference;
}
