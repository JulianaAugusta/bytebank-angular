import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Transaction } from '@shared/models';

@Component({
  selector: 'app-edit-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './edit-transaction-modal.component.html',
  styleUrl: './edit-transaction-modal.component.scss',
})
export class EditTransactionModalComponent {

  @Output() save = new EventEmitter<Transaction>();

  editedTransaction!: Transaction;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { transaction: Transaction }) {}

  ngOnInit() {
    this.editedTransaction = { ...this.data.transaction };
  }

  submit() {
    this.save.emit(this.editedTransaction);
  }
}
