import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

type Transaction  = {
  type: 'Recebida' | 'Enviada';
  amount: number;
  date: string;
  month: string;
};

@Component({
  selector: 'app-transaction-extract',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './transaction-extract.component.html',
  styleUrl: './transaction-extract.component.scss',
})
export class TransactionExtractComponent {
  transactionsByMonth: { [month: string]: Transaction[] } = {
    Abril: [
      { type: 'Recebida', amount: 1090, date: '2025-04-07', month: 'Abril' },
      { type: 'Enviada', amount: -1090, date: '2025-04-08', month: 'Abril' },
      { type: 'Recebida', amount: 900, date: '2025-04-08', month: 'Abril' },
    ],
    Maio: [
      { type: 'Recebida', amount: 1090, date: '2025-05-07', month: 'Maio' },
      { type: 'Enviada', amount: -1090, date: '2025-05-08', month: 'Maio' },
      { type: 'Recebida', amount: 900, date: '2025-05-08', month: 'Maio' },
    ],
  };

  get groupedTransactions(): { month: string; transactions: Transaction[] }[] {
    return Object.entries(this.transactionsByMonth).map(([month, transactions]) => ({
      month,
      transactions,
    }));
  }

  getPositiveAmount(amount: number): number {
    return Math.abs(amount);
  }
}
