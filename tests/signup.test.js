import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js"

describe("POST '/sign-up'", () => {
    beforeAll(async () => {
        await connection.query('DELETE FROM users;');
        await connection.query('DELETE from sessions')
        await connection.query(`INSERT INTO users (name, email, password) 
            VALUES ('pedro', 'pedrin@gmail.com', '123456')`)
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
            email: 'pedrin@gmail.com',
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
            email: 'pedrolucas@gmail.com',
            password: '123456',
            repeatPassword: '123456'
        }

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
        
        expect(result.status).toEqual(201)
    })
})