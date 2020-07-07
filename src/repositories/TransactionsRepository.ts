import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const income = await this.find({
      where: { type: 'income' },
    }).then(incomes =>
      incomes
        .map(transaction => transaction.value)
        .reduce((acumulador, valorAtual) => acumulador + valorAtual, 0),
    );

    const outcome = await this.find({
      where: { type: 'outcome' },
    }).then(incomes =>
      incomes
        .map(transaction => transaction.value)
        .reduce((acumulador, valorAtual) => acumulador + valorAtual, 0),
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
