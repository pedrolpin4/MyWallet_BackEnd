import faker from 'faker';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../../src/database/database.js';

const createUser = async () => {
    const DBName = faker.name.findName();
    const DBEmail = faker.internet.email();
    const DBPassword = bcrypt.hashSync('123456', 10);
    const user = await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *'
        ,[DBName, DBEmail, DBPassword]);
    const token = uuid();
    await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [user.rows[0].id, token]);
    return {
        ...user.rows[0],
        token
    };
}

const deleteUser = async (userId) => {
    await connection.query('DELETE FROM sessions WHERE "userId" = $1', [userId]);
    await connection.query('DELETE FROM users WHERE id = $1', [userId]);
}

export {
    createUser,
    deleteUser,
}
