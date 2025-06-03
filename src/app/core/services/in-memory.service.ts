import { Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { Transaction } from '@shared/models';
import { hashPassword } from '@shared/utils';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  createDb() {
    const users: User[] = [
      {
        id: 1,
        email: 'admin@email.com',
        name: 'Admin',
        password: hashPassword('admin123')
      }
    ];

    const transactions: Transaction[] = [
      {
        id: 1,
        date: '2023-10-01',
        description: 'Salary',
        amount: 5000,
        type: 'income',
        category: 'Salary',
        account: 'Bank Account',
        notes: 'Monthly salary',
        tags: ['salary', 'income']
      },
      {
        id: 2,
        date: '2023-10-02',
        description: 'Groceries',
        amount: 150,
        type: 'expense',
        category: 'Food',
        account: 'Bank Account',
        notes: 'Weekly groceries',
        tags: ['food', 'groceries']
      },
      {
        id: 3,
        date: '2023-10-03',
        description: 'Electricity Bill',
        amount: 100,
        type: 'expense',
        category: 'Utilities',
        account: 'Bank Account',
        notes: 'Monthly electricity bill',
        tags: ['utilities', 'bill']
      }
    ];
    
    return { users, transactions };
  }
}
