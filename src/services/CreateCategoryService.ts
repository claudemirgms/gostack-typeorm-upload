import { getRepository } from 'typeorm';

import Category from '../models/Category';

class CreateTransactionService {
  public async execute(title: string): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const existsCategory = await categoryRepository.findOne({
      where: { title },
    });

    if (!existsCategory) {
      const category = categoryRepository.create({
        title,
      });
      await categoryRepository.save(category);
      return category;
    }

    return existsCategory;
  }
}

export default CreateTransactionService;
