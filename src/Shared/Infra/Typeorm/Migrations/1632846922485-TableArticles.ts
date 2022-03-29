import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TableArticles1632846922485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'themes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'text',
            type: 'text',
          },
          {
            name: 'amount',
            type: 'real',
          },
          {
            name: 'img_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isDeleted',
            type: 'boolean',
            isNullable: true,
            default: false,
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
        foreignKeys: [
          {
            name: 'FKUserArticle',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles');
  }
}
