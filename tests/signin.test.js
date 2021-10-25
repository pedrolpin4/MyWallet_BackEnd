import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js"
import bcrypt from "bcrypt"

describe('POST "/sign-in" ', () => {
    beforeAll(async () => {
        const encriptedPassword = bcrypt.hashSync('1234567', 10);
        await connection.query(`DELETE FROM users WHERE email = 'pedrin@gmail.com';`);
        await connection.query('DELETE from sessions')
        await connection.query(`INSERT INTO users (name, email, password) 
            VALUES ('pedro', 'pedrin@gmail.com', $1)`, [encriptedPassword])
    })

    it('POST "/sign-in" returns 400 if non complete objects', async () => {
        const body = {
            password: ''
        }

        const result =  await supertest(app)
            .post('/sign-in')
            .send(body);

        expect(result.status).toEqual(400)
    })

    it('POST "/sign-in" return 400 if empty fields', async () => {
        const body = {
            email: '',
            password: '123456',
        }

        const result = await supertest(app)
            .post('/sign-in')
            .send(body);
            
        expect(result.status).toEqual(400)
    })

    it('POST "/sign-in" returns 400 if invalid values', async () => {
        const body = {
            email: 'posi',
            password: '123',
        }

        const result = await supertest(app)
            .post('/sign-in')
            .send(body);
            
        expect(result.status).toEqual(400)
    })

    it('POST "/sign-in" returns 404 if the email is not in the database', async () => {
        const body = {
            email: 'pedro@gmail.com',
            password: '123456',
        }

        const result = await supertest(app)
            .post('/sign-in')
            .send(body);
        
        expect(result.status).toEqual(404)
    })

    it('POST "/sign-in" returns 401 if a wrong password', async () => {
        const body = {
            email: 'pedrin@gmail.com',
            password: '12345678',
        }

        const result = await supertest(app)
            .post('/sign-in')
            .send(body);
        
        expect(result.status).toEqual(401)
    })

    it('POST "/sign-in" returns 200 if succes', async () => {
        const body = {
            email: 'pedrin@gmail.com',
            password: '1234567'
        }

        const result = await supertest(app)
            .post('/sign-in')
            .send(body);
        
        expect(result.status).toEqual(200)
        expect(result.body).toEqual({
            token: expect.any(String),
            name: expect.any(String)
        })
    })
})