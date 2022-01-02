import validations from "../validation/JoiValidations.js";
import * as userServices from "../services/userServices.js";
import ValidationError from '../errors/ValidationError.js'
import ConflictError from "../errors/ConflictError.js";
import Unauthorized from "../errors/Unauthorized.js";
import NotFound from "../errors/NotFound.js";

const signUp = async (req, res, next) => {
    const {
        name,
        email,
        password,
        repeatPassword 
    } = req.body;
    const signUpValidator = validations.signUp.validate(req.body).error;

    try {
        if(signUpValidator || repeatPassword !== password) {
            throw new ValidationError('');
        }
        await userServices.verifyExistentUser(email);
        await userServices.createUser(name, email, password) 
        return res.sendStatus(201);
    } catch (error) {
        if(error instanceof ValidationError || error instanceof ConflictError) {
            return res.status(error.status).send(error.message);
        }
        return next(error)
    }
}

const signIn = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    const signInValidator = validations.signIn.validate(req.body).error;

    try {
        if(signInValidator) throw new ValidationError(signInValidator.details[0].message);
        const user = await userServices.verifyLogin(email, password);
        userServices.verifyPassword(password, user.password)
        const token = await userServices.createToken(user.id)
        return res.send({
            token,
            name: user.name
        }).status(200);    
    } catch (error) {
        if(error instanceof ValidationError || error instanceof Unauthorized || error instanceof NotFound) {
            return res.status(error.status).send(error.message);
        }
        return next(error)
    }
}

export {
    signIn,
    signUp
}
