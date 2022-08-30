import "reflect-metadata"
import { DataSource } from "typeorm"
import {BaseEntity} from "./"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [BaseEntity],
    migrations: [],
    subscribers: [],
})
