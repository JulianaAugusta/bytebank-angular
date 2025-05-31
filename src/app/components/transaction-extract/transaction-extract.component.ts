import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  Transaction,
  TransactionService,
} from '@core/services/transaction.service';
import { groupBy } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { EditTransactionModalComponent } from '../edit-transaction-modal/edit-transaction-modal.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-transaction-extract',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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
      const grouped = groupBy(transactions, (t) => {
        const date = new Date(t.date);
        return date.toLocaleString('pt-BR', { month: 'long' });
      });

      this.groupedTransactions = Object.entries(grouped).map(
        ([month, transactions]) => ({
          month,
          transactions,
        })
      );
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
      width: '400px',
    });

    dialogRef.componentInstance.save.subscribe(
      (updatedTransaction: Transaction) => {
        this.transactionService
          .updateTransaction(updatedTransaction)
          .subscribe(() => {
            this.loadTransactions();
            dialogRef.close();
          });
      }
    );
  }

  deleteTransaction(id: number, description: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.transactionService.deleteTransaction(id).subscribe();
      }
    });
  }
}
