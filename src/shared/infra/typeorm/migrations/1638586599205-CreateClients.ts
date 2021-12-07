import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClients1638585460955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        schema: 'public',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'city_living_id',
            type: 'uuid',
          },
          {
            name: 'full_name',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'varchar',
            enum: ['F', 'M'],
            enumName: 'gender-enum',
          },
          {
            name: 'born_date',
            type: 'date',
          },
          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'version',
            type: 'int',
            default: 0,
          },
        ],
        foreignKeys: [
          {
            name: 'city-client-fk',
            referencedTableName: 'cities',
            referencedColumnNames: ['id'],
            columnNames: ['city_living_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
