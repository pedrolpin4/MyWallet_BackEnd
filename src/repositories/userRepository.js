import connection from "../database/database.js"

const insertSignUp = async (name, email, hashedPassword) => {
    await connection.query(`INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)`, [name, email, hashedPassword]);
}

const selectAllUsers = async (email) => {
    const users = await connection.query(
        `SELECT * FROM users WHERE email=$1`,
        [email]
    );

    return users
}

const selectLoginUser = async (email) => {
    const user = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    );

    return user
}

const insertToken = async (id, token) => {
    await connection.query(`INSERT INTO sessions ("userId", token) 
    VALUES($1, $2)`, [id, token]);
}

export {
    insertSignUp,
    selectAllUsers,
    selectLoginUser,
    insertToken,
}
