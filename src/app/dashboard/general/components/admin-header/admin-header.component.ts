import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [InfoCardComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

}
