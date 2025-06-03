import { Component, inject } from '@angular/core';
import { AccountBalanceComponent } from '../../components/account-balance/account-balance.component';
import { TransactionExtractComponent } from '../../components/transaction-extract/transaction-extract.component';
import { NewTransactionComponent } from '../../components/new-transaction/new-transaction.component';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AccountBalanceComponent, TransactionExtractComponent, NewTransactionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  username: string | null = inject(UserService).loggedInUser?.name ?? null;

  get greeting(): string {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Bom dia';
    if (currentHour < 18) return 'Boa tarde';
    return 'Boa noite';
  }
}
