import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableSales1641952705577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'code_saleFK',
            type: 'varchar',
          },
          {
            name: 'total',
            type: 'decimal',
            isNullable: false,
          },
          {
            name: 'consumer',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
