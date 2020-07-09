import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateTransactionsAndCategories1594267508418
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //     await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
    //         await queryRunner.query(`ALTER TABLE "todo" ADD "authorId" integer`);
    //         await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_c56120106977cc14f975726af07" FOREIGN KEY ("authorId") REFERENCES "author"("id")`);
    //     }

    //     public async down(queryRunner: QueryRunner): Promise<any> {
    //         await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_c56120106977cc14f975726af07"`);
    //         await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "authorId"`);
    //         await queryRunner.query(`DROP TABLE "author"`);
    //     }

    // }

    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'FK_category_id',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'FK_category_id');
    await queryRunner.dropColumn('transactions', 'category_id');
    await queryRunner.dropTable('transactions');
    await queryRunner.dropTable('categories');
  }
}
