import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-cell',
  template: `
    <div class="border-[2px] border-[#DADADA] rounded-md p-10  text-left" [ngClass]="cssClass">
      <p class="text-[#685DC5] text-xl font-medium">{{ title }}</p>
      <p class="md:text-lg text-2xl font-light md:mt-10">
        {{ bigText }}
      </p>
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class InfoCellComponent {
  @Input() title: string = '';
  @Input() bigText: string = '';
  @Input() cssClass: string = '';
}
