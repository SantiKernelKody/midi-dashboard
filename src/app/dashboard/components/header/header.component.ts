import { Component } from '@angular/core';
import { GeneralService } from '../../general/service/general.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userItems = [
    { label: 'Settings', icon: 'pi pi-cog' },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];
  userName: string = '';
  userRole: string = '';

  constructor(private userService: GeneralService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(userInfo => {
      this.userName = userInfo.name;
      this.userRole = userInfo.role_name;
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
