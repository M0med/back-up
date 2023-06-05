import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myDashboard';

  isSideNavCollasped = false ;
  screenWidth = 0;

  
  onToggleSideNav(data: SideNavToggle) : void {
    this.isSideNavCollasped = data.collapsed;
    this.screenWidth = data.screenWidth ;
  }



}
