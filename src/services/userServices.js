import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import connection from "../database/database.js"

const verifyExistentUser = async (email) => {
    const existentUser = await connection.query(`SELECT * FROM users WHERE email = $1`, [email])

    if(existentUser.rowCount){
        return true       
    }

    return false
}

const createUser = async (name, email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    await connection.query(`INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)`, [name, email, hashedPassword]);
}

const verifyLogin = async (email) => {
    const result = await connection.query(`SELECT * FROM users
            WHERE email = $1`,[email]);

    const user = result.rows[0];
    
    if(!user){
        return null
    }

    return user;
}

const verifyPassword = (password, hashedPassword) => {
    if(!bcrypt.compareSync(password, hashedPassword)){
        return false
    }

    return true
}

const createToken = async (id) => {
    const token = uuid();

    await connection.query(`INSERT INTO sessions ("userId", token) 
        VALUES($1, $2)`, [id, token]);

    return token
}

export {
    verifyExistentUser,
    createUser,
    verifyLogin,
    verifyPassword,
    createToken
}