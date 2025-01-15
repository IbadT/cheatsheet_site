import {
    DB_HOST,
        DB_LOGGING,
        DB_MIGRATIONS_RUN,
        DB_MIGRATIONS_TABLE_NAME,
        DB_NAME,
        DB_PASSWORD,
        DB_PORT,
        DB_TYPE,
        DB_USERNAME
} from "../constants/index";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { PostgresConnectionCredentialsOptions } from "typeorm/driver/postgres/PostgresConnectionCredentialsOptions";
// import migrations from "./migrations";

export const databaseOptions = (config: ConfigService):
    TypeOrmModuleOptions & PostgresConnectionCredentialsOptions => ({
    // typetype: <any>config.get(DB_TYPE),
    type: "postgres",
    // host: config.get(DB_HOST),
    // host: "db",
    host: "localhost",
    // port: Number(config.get(DB_PORT)),
    port: 5432,
    // username: config.get(DB_USERNAME),
    username: "postgres",
    // password: config.get(DB_PASSWORD),
    // password: "postgres",
    password: "postgres",
    // database: config.get(DB_NAME),
    // database: config.get(DB_NAME),
    database: "cheatsheet_site",
    // logging: config.get(DB_LOGGING) === true,
    logging: false,
    synchronize: true,
    // migrationsRun: config.get(DB_MIGRATIONS_RUN) === true,
    // migrationsTableName: config.get(DB_MIGRATIONS_TABLE_NAME),
    // migrations,
    autoLoadEntities: true,
});