import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableSaleItem1641940804754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sale_item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'code_sale',
            type: 'varchar',
          },
          {
            name: 'item_product',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'seller',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sale_item');
  }
}
