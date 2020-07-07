import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

class CreateTransactionService {
  public async execute(request: Transaction): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (request.type === 'outcome') {
      const balance = await transactionsRepository.getBalance();

      if (request.value > balance.total) {
        throw new AppError('Saldo Insuficiente');
      }
    }
    const transaction = transactionsRepository.create(request);

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
