import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js"

describe('GET "/cash-flow" ', () => {
    const token = '10f8c2d2-7115-4349-b124-e497f0b7f00f';

    beforeAll(async () => {
        await connection.query('DELETE FROM sessions;');
        await connection.query(`INSERT INTO sessions (id, "userId", token)
            VALUES (1, 1, $1)`, [token])
    })

    it('GET "/cash-flow" returns 401 if no headers', async () => {
        const result = await supertest(app).get('/cash-flow')
        expect(result.status).toEqual(401)
    })

    it('GET "/cash-flow" returns ')

})
