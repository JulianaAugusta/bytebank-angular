export type Transaction = {
  id?: number;
  date: string;
  description?: string;
  amount: number;
  type: 'income' | 'expense';
  category?: string;
  account?: string;
  notes?: string;
  tags?: string[];
}