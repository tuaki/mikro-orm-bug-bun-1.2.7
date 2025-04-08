import express from 'express';
import { orm } from ':backend/orm';
import { User } from ':backend/api/user.entity';

export const app = express();

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

const defaultUsers = [ {
    id: 'default',
    email: 'default@example.com',
    password: 'default',
} ];

app.get('/users', async (req, res, next) => {
    try {
        // const users = await orm.em.findAll(User);
        const users = defaultUsers;
        res.json(users);
    }
    catch (err) {
        next(err);
    }
});

const port = 3400;

app.listen(port);

console.log(`backend listening on port ${port}`);
