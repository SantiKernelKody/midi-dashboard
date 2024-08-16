import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ROLES } from '../shared/constants';
import { RolePipe } from '../role.pipe';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule, CommonModule, RolePipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  hash!: string;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  validRoles = [ROLES.ADMIN, ROLES.TEACHER, ROLES.PARENT];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hash = params['hash'];

    });
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Confirm Password:', this.confirmPassword);
    // Aquí puedes agregar la lógica adicional para manejar el registro
  }
}
