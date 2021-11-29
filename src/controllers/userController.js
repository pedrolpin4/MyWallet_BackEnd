import validations from "../validation/JoiValidations.js";
import * as userServices from "../services/userServices.js"

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
        const existentUser = await userServices.verifyExistentUser(email);

        if(existentUser){
            res.sendStatus(409);
            return;
        }

        await userServices.createUser(name, email, password) 

        res.sendStatus(201);
    } catch (error) {
        console.log(error)
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
        res.sendStatus(400);;
        return;
    }

    try {
        const user = await userServices.verifyLogin(email, password);

        if(!user){
            res.sendStatus(404);
            return;
        }

        const passVerify = userServices.verifyPassword(password, user.password)

        if(!passVerify){
            res.sendStatus(401);
            return;
        }

        const token = await userServices.createToken(user.id)

        res.send({
            token,
            name: user.name
        }).status(200);    

    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export {
    signIn,
    signUp
}
