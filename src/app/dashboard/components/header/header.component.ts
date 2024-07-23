import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuModule, MenubarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string = 'John Doe'; // Replace with actual user data
  userItems: any[] = [];

  ngOnInit(): void {
    this.userItems = [
      { label: 'Settings', icon: 'pi pi-cog', command: () => this.onSettings() },
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.onLogout() }
    ];
  }

  onSettings() {
    console.log('Navigating to settings...');
    // Add navigation logic here
  }

  onLogout() {
    console.log('Logging out...');
    // Add logout logic here
  }
}
