import fs from 'fs';
// import csv from 'async-csv';
import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv = require('async-csv');

let type: 'income' | 'outcome';
class ImportTransactionsService {
  async execute(path: string): Promise<Transaction[]> {
    const csvString = await fs.promises.readFile(path, 'utf-8');
    const rows = await csv.parse(csvString);

    const transactions: Transaction[] = [];

    const createTransaction = new CreateTransactionService();

    // eslint-disable-next-line no-restricted-syntax
    for (const item of (rows as []).splice(1)) {
      if (item[1] === ' income' || item[1] === 'income') {
        type = 'income';
      }
      if (item[1] === ' outcome' || item[1] === 'outcome') {
        type = 'outcome';
      }
      // eslint-disable-next-line no-await-in-loop
      const transaction = await createTransaction.execute({
        title: item[0],
        value: item[2],
        type,
        category: item[3],
      });
      transactions.push(transaction);
    }
    // console.log(transactions);
    return transactions;
  }
}

export default ImportTransactionsService;
