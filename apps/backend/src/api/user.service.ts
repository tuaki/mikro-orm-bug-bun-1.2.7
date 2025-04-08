import bcrypt from 'bcrypt';
import { User } from './user.entity';
import { orm } from ':backend/orm';
import { env } from ':env';

const BCRYPT_ROUNDS = env.NODE_ENV === 'development' ? 1 : 13;

export async function createUser(data: {
    email: string;
    password?: string;
}): Promise<User> {
    const user = new User();

    user.email = data.email;
    if (data.password)
        user.password = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

    orm.em.persist(user);

    return user;
}

export async function updateUser(user: User, data: {
    password: string;
}): Promise<User> {
    user.password = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

    orm.em.persist(user);

    return user;
}
