import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableItemArticleByUsersBuy1643041249567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'itemUserPurchased',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isUnique: false,
          },
          {
            name: 'article_id',
            type: 'uuid',
            isUnique: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FKUserItemUserPurchased',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKArticleItemUserPurchased',
            referencedTableName: 'articles',
            referencedColumnNames: ['id'],
            columnNames: ['article_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('itemUserPurchased');
  }
}
