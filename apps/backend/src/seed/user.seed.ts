import { createUser } from ':backend/api/user/user.service';

export async function seedUser() {
    console.log('UserSeed');

    await createUser({
        email: 'user@example.com',
        password: 'password',
    })
}
