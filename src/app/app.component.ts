import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/nav-bar.component/nav-bar.component';
import { ScholarshipDetailComponent } from './components/nav-bar.component/body/scholarship-details.component/scholarship-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ScholarshipDetailComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'harbour.space-test';
}