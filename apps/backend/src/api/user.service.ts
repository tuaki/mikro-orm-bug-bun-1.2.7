import bcrypt from 'bcrypt';
import { User } from './user.entity';
import { orm } from ':backend/orm';

export async function createUser(data: {
    email: string;
    password?: string;
}): Promise<User> {
    const user = new User();

    user.email = data.email;
    if (data.password)
        user.password = await bcrypt.hash(data.password, 1);

    orm.em.persist(user);

    return user;
}

export async function updateUser(user: User, data: {
    password: string;
}): Promise<User> {
    user.password = await bcrypt.hash(data.password, 1);

    orm.em.persist(user);

    return user;
}
