import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationService {
    private confirmationSubject = new Subject<ConfirmationRequest>();

    getConfirmationRequest() {
        return this.confirmationSubject.asObservable();
    }

    requestConfirmation(message: string, onConfirm: () => void) {
        this.confirmationSubject.next({ message, onConfirm });
    }
}

interface ConfirmationRequest {
    message: string;
    onConfirm: () => void;
}
