import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { event } from 'jquery';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proj';
  isLogiorSignup:boolean = false;
  showHeader = true; // Set a flag to control header visibility

  constructor(private router:Router) { }
  ngOnInit() {

  this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationEnd) {
      const currentRoute = this.router.url; // Get the current route

      // Check if the current route is 'login' or 'signup'
      if (currentRoute === '/' || currentRoute === '/signup') {
        this.showHeader = false; // Hide the header component
      } else {
        this.showHeader = true; // Show the header component
      }
    }
  });
  }
}
