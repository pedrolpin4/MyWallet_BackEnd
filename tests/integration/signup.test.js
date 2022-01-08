import app from "../../src/app.js";
import supertest from "supertest";
import faker from 'faker';
import * as userFactory from '../factories/userFactory.js'

describe("POST '/sign-up'", () => {
    let user;

    beforeAll(async () => {
        user = await userFactory.createUser();
    })

    afterAll(async () => {
        await userFactory.deleteUser(user.id);
    })

    it('POST /sign-up returns 400 if non complete objects ', async () => {
        const body = {
            name: '',
            password: ''
        }

        const result =  await supertest(app)
            .post('/sign-up')
            .send(body);

        expect(result.status).toEqual(400)
    })

    it('POST /sign-up returns 400 if empty fields', async () => {
        const body = {
            name: 'Pedro',
            email: '',
            password: '123456',
            repeatPassword: '123456'
        }

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
            
        expect(result.status).toEqual(400)
    })

    it('POST /sign-up returns 400 if invalid values', async () => {
        const body = {
            name: 'Pe',
            email: 'posi',
            password: '123',
            repeatPassword: '123'
        }

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
            
        expect(result.status).toEqual(400)
    })

    it('POST /sign-up returns 400 if a password different then its confirmation', async () => {
        const body = {
            name: 'Pedro',
            email: 'pedrolucas@gmail.com',
            password: '123456',
            repeatPassword: '1234567'
        }

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
            
        expect(result.status).toEqual(400)
    })

    it('POST /sign-up returns 409 if the email is already in the database', async () => {
        const body = {
            name: 'Pedro',
            email: user.email,
            password: '123456',
            repeatPassword: '123456'
        }

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
        
        expect(result.status).toEqual(409)
    })

    it('POST /sign-up returns 201 if success', async () => {
        const body = {
            name: 'Pedro',
            email: faker.internet.email(),
            password: '123456',
            repeatPassword: '123456'
        }

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
        
        expect(result.status).toEqual(201)
    })
})