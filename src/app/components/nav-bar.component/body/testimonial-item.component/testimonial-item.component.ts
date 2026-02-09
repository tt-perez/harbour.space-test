import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-item.component.html'
})
export class TestimonialItemComponent {
  @Input() name = 'Irene Pereyra';
  @Input() role = "Interaction Design Fellow '19";
  @Input() testimonial =
    "This Fellowship was a turning point in my career. I wouldn't be where I am today without the financial support and experienced offered through the program.";
  @Input() education = 'Education \u00b7 B.A. Visual Design';
  @Input() avatarSrc = './placeholder.png';
  @Input() linkedinSrc = './linkedin.png';
}
