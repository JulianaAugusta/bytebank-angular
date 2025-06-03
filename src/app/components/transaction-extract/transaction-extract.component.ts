import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '@core/services/transaction.service';
import { groupBy } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { EditTransactionModalComponent } from '../edit-transaction-modal/edit-transaction-modal.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { Transaction } from '@shared/models';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-transaction-extract',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './transaction-extract.component.html',
  styleUrl: './transaction-extract.component.scss',
})
export class TransactionExtractComponent {
  groupedTransactions: { month: string; transactions: Transaction[] }[] = [];

  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTransactions();

    this.transactionService.transactionsChanged$.subscribe(() => {
      this.loadTransactions();
    });
  }

  private loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((transactions) => {
      transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      const grouped = groupBy(transactions, (t) => {
        const d = new Date(t.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
      });

      const sortedEntries = Object.entries(grouped).sort((a, b) => {
        const dateA = new Date(a[0] + '-01');
        const dateB = new Date(b[0] + '-01');
        return dateB.getTime() - dateA.getTime();
      });

      this.groupedTransactions = sortedEntries.map(([key, transactions]) => {
        const sampleDate = new Date(`${key}-01`);
        const formattedMonth = sampleDate.toLocaleDateString('pt-BR', {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        });

        return {
          month: formattedMonth,
          transactions,
        };
      });
    });
  }

  getPositiveAmount(amount: number): number {
    return Math.abs(amount);
  }

  getIcon(t: Transaction): string {
    return t.amount > 0 ? 'call_received' : 'call_made';
  }

  openEditModal(transaction: Transaction): void {
    const dialogRef = this.dialog.open(EditTransactionModalComponent, {
      data: { transaction },
      width: '700px',
      height: '500px'
    });

    dialogRef
      .afterClosed()
      .subscribe((updatedTransaction: Transaction | undefined) => {
        if (updatedTransaction) {
          this.transactionService
            .updateTransaction(updatedTransaction)
            .subscribe(() => {
              this.loadTransactions();
            });
        }
      });
  }

  deleteTransaction(id: number, description: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { description },
      width: '300px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.transactionService.deleteTransaction(id).subscribe();
      }
    });
  }
}
