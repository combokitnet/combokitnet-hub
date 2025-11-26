import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764180167770 implements MigrationInterface {
    name = 'Init1764180167770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "v3_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_204203045cffe32bd4282e2be72" UNIQUE ("email"), CONSTRAINT "PK_312b6bd21e63be6442fcc1b6912" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "v3_toolkit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "prompt" character varying NOT NULL, "filePath" character varying NOT NULL, "language" character varying NOT NULL DEFAULT 'html', "isPublic" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_71301b848d66dfc55c6dfb101fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "v3_collection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_fc0c79a7d2ff15971a42446ee6d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "v3_collection"`);
        await queryRunner.query(`DROP TABLE "v3_toolkit"`);
        await queryRunner.query(`DROP TABLE "v3_user"`);
    }

}
