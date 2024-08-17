import { Component } from '@angular/core';
import { ConfirmationService } from '../../../services/confirmation.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  message: string | null = null;
  private onConfirmCallback: () => void = () => { };

  constructor(private confirmationService: ConfirmationService) {
    this.confirmationService.getConfirmationRequest().subscribe(request => {
      this.message = request.message;
      this.onConfirmCallback = request.onConfirm;
    });
  }

  confirm() {
    this.onConfirmCallback();
    this.message = null;
  }

  cancel() {
    this.message = null;
  }
}
