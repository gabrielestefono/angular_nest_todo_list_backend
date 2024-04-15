import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Userstable1713146005294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "nome",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "senha",
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
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        await queryRunner.dropForeignKey("tasks", foreignKey);
        await queryRunner.dropTable("users");
    }
}
