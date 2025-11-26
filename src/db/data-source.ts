import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Toolkit } from "../entities/Toolkit";
import { Collection } from "../entities/Collection";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "combokitnet",
    synchronize: true,
    logging: false,
    entities: [User, Toolkit, Collection],
    migrations: [],
    subscribers: [],
});

let initializationPromise: Promise<DataSource> | null = null;

export const initializeDataSource = async () => {
    if (AppDataSource.isInitialized) {
        return AppDataSource;
    }

    if (initializationPromise) {
        return initializationPromise;
    }

    try {
        initializationPromise = AppDataSource.initialize();
        await initializationPromise;
        return AppDataSource;
    } catch (error) {
        initializationPromise = null;
        throw error;
    }
};
