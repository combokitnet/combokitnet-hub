import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Toolkit } from "../entities/Toolkit";
import { Collection } from "../entities/Collection";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "dev.db",
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
