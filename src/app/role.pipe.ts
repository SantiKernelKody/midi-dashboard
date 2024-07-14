import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role',
  standalone: true
})
export class RolePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'admin':
        return 'Administrador';
      case 'teacher':
        return 'Profesor';
      case 'parent':
        return 'Padre de familia';
      default:
        return value;
    }
  }

}
