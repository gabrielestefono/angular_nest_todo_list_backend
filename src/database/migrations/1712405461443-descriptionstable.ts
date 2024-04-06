import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Descriptionstable1712405461443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "descriptions",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }));

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            columnNames: ["descriptionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "descriptions",
            onDelete: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('descriptions');
    }

}
