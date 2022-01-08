import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterDeleteUsersName1628201137706 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'img_url');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'img_url',
        type: 'varchar',
      })
    );
  }
}
