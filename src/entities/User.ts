import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// import { Toolkit } from "./Toolkit";
// import { Collection } from "./Collection";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    // Relationships commented out to avoid circular dependency
    // Will be added back when implementing user authentication
    // @OneToMany(() => Toolkit, (toolkit) => toolkit.owner)
    // toolkits: Toolkit[];

    // @OneToMany(() => Collection, (collection) => collection.owner)
    // collections: Collection[];
}
