import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// import { User } from "./User";
// import { Toolkit } from "./Toolkit";

@Entity()
export class Collection {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    // Relationships commented out to avoid circular dependency
    // Will be added back when implementing user authentication and collections
    // @ManyToOne(() => User, (user) => user.collections)
    // owner: User;

    // @ManyToMany(() => Toolkit, (toolkit) => toolkit.collections)
    // @JoinTable()
    // toolkits: Toolkit[];
}
