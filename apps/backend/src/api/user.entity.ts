import { v4 } from 'uuid';
import { Entity, PrimaryKey, Property, t, Unique } from '@mikro-orm/core';

@Entity()
export class User {
    @PrimaryKey({ type: t.uuid })
    id: string = v4();

    @Property({ length: 180 })
    @Unique()
    email!: string;

    @Property({ length: 255 })
    password?: string;
}
