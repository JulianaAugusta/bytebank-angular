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
import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

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
    NgxMaskDirective,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss',
})
export class NewTransactionComponent {
  constructor(private transactionService: TransactionService) {}

  transactionType: 'Received' | 'Sent' | null = null;
  amount: number | null = null;
  transactionDate: Date | null = null;

  submitTransaction(): void {
    if (this.transactionType && this.amount !== null) {
      const transaction: Partial<Transaction> = {
        type: this.transactionType === 'Received' ? 'income' : 'expense',
        amount: Number(this.amount),
        date: this.transactionDate?.toISOString() ?? new Date().toISOString(),
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
