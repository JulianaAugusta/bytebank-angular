import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@shared/models';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = '/api/transactions';
  private transactionsChanged = new Subject<void>();

  transactionsChanged$ = this.transactionsChanged.asObservable();

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  createTransaction(
    transaction: Partial<Transaction>
  ): Observable<Transaction> {
    return this.http
      .post<Transaction>(this.apiUrl, transaction)
      .pipe(tap(() => this.transactionsChanged.next()));
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .put<Transaction>(`/api/transactions/${transaction.id}`, transaction)
      .pipe(tap(() => this.transactionsChanged.next()));
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http
      .delete<void>(`/api/transactions/${id}`)
      .pipe(tap(() => this.transactionsChanged.next()));
  }
}
