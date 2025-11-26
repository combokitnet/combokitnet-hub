import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
// import { User } from "./User";
// import { Collection } from "./Collection";

@Entity()
export class Toolkit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    prompt: string;

    @Column()
    filePath: string; // Path to HTML file: public/toolkits/:id/index.html

    @Column({ default: 'html' })
    language: string;

    @Column({ default: false })
    isPublic: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships commented out to avoid circular dependency
    // Will be added back when implementing user authentication
    // @ManyToOne(() => User, (user) => user.toolkits)
    // owner: User;

    // @ManyToMany(() => Collection, (collection) => collection.toolkits)
    // collections: Collection[];
}

