import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {
  Transaction,
  TransactionService,
} from '@core/services/transaction.service';

@Component({
  selector: 'app-account-balance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './account-balance.component.html',
  styleUrl: './account-balance.component.scss',
  providers: [CurrencyPipe, DatePipe],
})
export class AccountBalanceComponent implements OnInit {
  balance = 0;
  showBalance = true;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadBalance();

    this.transactionService.transactionsChanged$.subscribe(() => {
      this.loadBalance();
    });
  }

  private loadBalance(): void {
    this.transactionService.getTransactions().subscribe((transactions: Transaction[]) => {
      this.balance = transactions.reduce((total, t) => {
        const amount = Number(t.amount);
        return t.type === 'income' ? total + amount : total - amount;
      }, 0);
    });
  }

  toggleBalanceVisibility(): void {
    this.showBalance = !this.showBalance;
  }

  get formattedCurrentDate(): string {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}
