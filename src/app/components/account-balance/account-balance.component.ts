import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-account-balance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './account-balance.component.html',
  styleUrl: './account-balance.component.scss',
  providers: [CurrencyPipe, DatePipe]
})
export class AccountBalanceComponent {
  balance = 30000;
  showBalance = true;

  toggleBalanceVisibility() {
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
