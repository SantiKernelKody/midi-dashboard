import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'app-parent-header',
  standalone: true,
  imports: [InfoCardComponent, CommonModule, DropdownModule, FormsModule],
  templateUrl: './parent-header.component.html',
  styleUrl: './parent-header.component.css'
})
export class ParentHeaderComponent {
  selectedGame: any;
  selectedKid: any;
  kids = [
    { label: 'Player 1', value: '1' },
    { label: 'PLayer 2', value: '2' },
    { label: 'Player 3', value: '3' },
  ];
  games = [
    { label: 'Juego 1', value: '1' },
    { label: 'Juego 2', value: '2' },
    { label: 'Juego 3', value: '3' },
  ];
}
