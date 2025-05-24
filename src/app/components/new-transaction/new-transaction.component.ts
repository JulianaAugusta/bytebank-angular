import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-transaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss',
})
export class NewTransactionComponent {
  transactionType: 'Received' | 'Sent' | null = null;
  amount: number | null = null;

  submitTransaction(): void {
    if (this.transactionType && this.amount !== null) {
      console.log('New transaction:', {
        type: this.transactionType,
        amount: this.amount,
      });
      // TODO: enviar pro serviço futuramente
      this.transactionType = null;
      this.amount = null;
    }
  }
}
