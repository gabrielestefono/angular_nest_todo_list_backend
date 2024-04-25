import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddVerifiedAt1714050405411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn(
            {
                name: 'verified_at',
                type: 'timestamp',
                isNullable: true,
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'verified_at');
    }

}
