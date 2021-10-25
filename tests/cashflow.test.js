import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js"

describe('GET "/cash-flow" ', () => {
    const token = '10f8c2d2-7115-4349-b124-e497f0b7f00f';

    beforeAll(async () => {
        await connection.query('DELETE FROM sessions;');
        await connection.query(`INSERT INTO sessions ("userId", token)
            VALUES (1, $1)`, [token])
        await connection.query(`INSERT INTO transactions (date, value, "userId", description)
            VALUES ('2021-10-15', 200, 1, 'nothing')`)
    })

    afterEach(async () => {
        await connection.query('DELETE FROM transactions WHERE "userId" = 1')
    })

    it('GET "/cash-flow" returns 200 if valid token and has transactions', async () => {
        const result = await supertest(app)
            .get('/cash-flow')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200)
    })

    it('GET "/cash-flow" returns 204 if valid token and no transactions', async () => {
        const result = await supertest(app)
            .get('/cash-flow')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(204)
    })

    it('GET "/cash-flow" returns 401 if no headers', async () => {
        const result = await supertest(app).get('/cash-flow')
        expect(result.status).toEqual(401)
    })

    it('GET "/cash-flow" returns 401 if invalid token', async () => {
        const result = await supertest(app)
            .get('/cash-flow')
            .set('Authorization', `Bearer kdjksadjadksd`);
        expect(result.status).toEqual(401)
    })
})
