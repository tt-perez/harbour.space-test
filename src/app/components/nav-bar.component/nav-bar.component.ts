import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
