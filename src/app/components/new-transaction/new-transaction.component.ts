import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  Transaction,
  TransactionService,
} from '@core/services/transaction.service';
import {MatCardModule} from '@angular/material/card';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-new-transaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss',
})
export class NewTransactionComponent {
  constructor(private transactionService: TransactionService) {}

  transactionType: 'Received' | 'Sent' | null = null;
  amount: number | null = null;

  submitTransaction(): void {
    if (this.transactionType && this.amount !== null) {
      const transaction: Partial<Transaction> = {
        type: this.transactionType === 'Received' ? 'income' : 'expense',
        amount: Number(this.amount),
        date: new Date().toISOString(),
        description:
          this.transactionType === 'Received' ? 'Recebida' : 'Enviada',
        category: 'Pix',
        account: 'Bank Account',
        notes: '',
        tags: [] as string[],
      };
      this.transactionService.createTransaction(transaction).subscribe(() => {
        console.log('Transação criada com sucesso!');
        this.transactionType = null;
        this.amount = null;
      });
    }
  }
}
