import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property({ length: 180 })
    email!: string;

    @Property({ length: 255 })
    password?: string;
}
