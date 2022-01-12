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
            name: 'fk_code_sale',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'total',
            type: 'money',
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
        foreignKeys: [
          {
            name: 'fk_code_sale',
            referencedTableName: 'sale_item',
            referencedColumnNames: ['id_code_sale'],
            columnNames: ['fk_code_sale'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
