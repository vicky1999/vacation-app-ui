import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public _snackBar: MatSnackBar) { }

  showSuccessToast(message: string, action: string = '') {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-toast'],
      duration: 5000
    });
  }

  showErrorToast(message: string, action: string = '') {
    this._snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-toast'],
      duration: 5000
    });
  }
}
