import { Component } from '@angular/core';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [AdminHeaderComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.css'
})
export class GeneralComponent {

}
