import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TransactionService } from '@core/services/transaction.service';

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
  constructor(private transactionService: TransactionService) {}

  transactionType: 'Received' | 'Sent' | null = null;
  amount: number | null = null;
  transactionDate: string | null = null;

  submitTransaction(): void {
    if (this.transactionType && this.amount !== null) {
      const transaction = {
        type:
          this.transactionType === 'Received'
            ? ('income' as const)
            : ('expense' as const),
        amount: Number(this.amount),
        date: this.transactionDate ?? new Date().toISOString(),
        description:
          this.transactionType === 'Received' ? 'Depósito' : 'Transferência',
        category: 'Pix',
        account: 'Bank Account',
        notes: '',
        tags: [] as string[],
      };

        console.log('Payload:', transaction);
        console.log('Tipo de amount:', typeof transaction.amount, transaction.amount);

      this.transactionService.createTransaction(transaction).subscribe(() => {
        console.log('Transação criada com sucesso!');
        this.transactionType = null;
        this.amount = null;
      });
    }
  }
}
