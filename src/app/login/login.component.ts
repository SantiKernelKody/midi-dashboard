import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RolePipe } from '../role.pipe';
import { ROLES } from '../shared/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, PasswordModule, RolePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role!: string;
  email: string = "";
  password: string = "";
  validRoles = [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.role = params['role'];
      if (!this.validRoles.includes(this.role)) {
        this.router.navigate(['']);
      }
    });
  }
  onSubmit(): void {
    console.log('Username:', this.email);
    console.log('Password:', this.password);
    console.log('Role:', this.role);
  }
}
