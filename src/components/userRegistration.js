import Joi from "joi";
import bcrypt from "bcrypt";

const signIn = async (req, res, connection) => {
    const {
        name,
        email,
        password,
        repeatPassword 
    } = req.body;
    
    const signInValidator = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required(),
        repeatPassword: Joi.string().required()
    })

    try {
        if(signInValidator.validate(req.body).error || repeatPassword !== password){
            res.sendStatus(400);
            return;
        }

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

const signUp = async (req, res, connection) => {
    const {
        email,
        password
    } = req.body;
    try {
        const result = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);

        const user = result.rows[0];

        if(!user){
            res.sendStatus(404);
            return;
        }
    
        console.log(user.password);

        if(!bcrypt.compareSync(password, user.password)){
            res.sendStatus(401);
            return;
        }
    
        res.sendStatus(200);    
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const userRegistration = {
    signIn,
    signUp
}

export default userRegistration