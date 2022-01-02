import app from "../../src/app.js";
import supertest from "supertest";
import { createUser, deleteUser } from "../factories/userFactory.js";
import { createTransaction, deleteTransaction } from "../factories/transactionsFactory.js";

describe('GET "/cash-flow" ', () => {
    let user;
    let transactionId;
    beforeAll(async () => {
        user = await createUser();
        transactionId = await createTransaction(user.id)
    })

    afterEach(async () => {
        await deleteTransaction(transactionId);
    })

    afterAll(async () => {
        await deleteUser(user.id);
    })

    it('GET "/cash-flow" returns 200 if valid token and has transactions', async () => {
        const result = await supertest(app)
            .get('/cash-flow')
            .set('Authorization', `Bearer ${user.token}`);
        expect(result.status).toEqual(200);
    })

    it('GET "/cash-flow" returns 204 if valid token and no transactions', async () => {
        const result = await supertest(app)
            .get('/cash-flow')
            .set('Authorization', `Bearer ${user.token}`);
        expect(result.status).toEqual(204);
    })

    it('GET "/cash-flow" returns 401 if no headers', async () => {
        const result = await supertest(app).get('/cash-flow');
        expect(result.status).toEqual(401);
    })

    it('GET "/cash-flow" returns 401 if invalid token', async () => {
        const result = await supertest(app)
            .get('/cash-flow')
            .set('Authorization', `Bearer ksadksdas`);
        expect(result.status).toEqual(401);
    })
})