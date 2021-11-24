import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import validations from "../validation/JoiValidations.js";
import connection from "../database/database.js";

const signUp = async (req, res) => {
    const {
        name,
        email,
        password,
        repeatPassword 
    } = req.body;
    
    const signUpValidator = validations.signUp

    if(signUpValidator.validate(req.body).error || repeatPassword !== password){
        res.sendStatus(400);
        return;
    }

    try {
        const emailVerifier = await connection.query(`SELECT * FROM users WHERE email = $1`, [email])

        if(emailVerifier.rows.length){
            res.sendStatus(409);
            return;
        }

        const encriptedPassword = bcrypt.hashSync(password, 10);

        await connection.query(`INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3)`, [name, email, encriptedPassword]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

const signIn = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const signInValidator = validations.signIn;

    if(signInValidator.validate(req.body).error){
        res.sendStatus(400);
        return;
    }

    try {
        const tokenVerifier = await connection.query(`SELECT * FROM users 
            JOIN sessions ON users.id = sessions."userId"
            WHERE email = $1`, [email]);

        if(tokenVerifier.rows.length){
            await connection.query(`DELETE FROM sessions 
                WHERE token = $1`, [tokenVerifier.rows[0].token]);
        }

        const result = await connection.query(`SELECT * FROM users
            WHERE email = $1`,[email]);

        const user = result.rows[0];
        
        if(!user){
            res.sendStatus(404);
            return;
        }

        if(!bcrypt.compareSync(password, user.password)){
            res.sendStatus(401);
            return;
        }

        const token = uuid();
        await connection.query(`INSERT INTO sessions ("userId", token) 
            VALUES($1, $2)`, [user.id, token]);

        res.send({
            token,
            name: user.name
        }).status(200);    

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signIn,
    signUp
}
