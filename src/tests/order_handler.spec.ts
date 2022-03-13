import app from '../server';
import { Order } from '../models/order';
import supertest from 'supertest';

const request = supertest(app);

let testedOrder: Order;
let testedOrders: Order[];
let token: string;
let res: supertest.Response;


describe('Orders ENDPOINTS', () => {
    beforeAll(async () => {
        const res = await request
            .post('/users')
            .send({ username: 'mohamed', password: 'test123' })
            .set('Accept', 'application/json')
        token = res.body
    });

    afterAll(async () => {
        const res = await request
            .delete('/users/1')
            .send({ token: token })
            .set('Authorization', `Bearer ${token}`)
    });


    describe('POST REQUEST /orders', () => {
        
        it('responds with status 401 when sending a bad request ', async () => {
            res = await request
                .post('/orders')
                .send({ status: 'active', user_id: "1", token: token })
                .set('Authorization', `Bearer ${token}`)

            testedOrder = res.body
            expect(res.status).toEqual(401);
        });

        });

    it('should return status 401 without a token', async () => {
        res = await request
            .post('/orders')
            .send({ status: 'active' })

        expect(res.status).toEqual(401)
    });


    describe('GET REQUEST /orders', () => {
        it('should return a response with statusCode 404 when sending a bad request', async () => {
            res = await request
                .get('/order')
            testedOrders = res.body
            expect(res.status).toEqual(404)
        });
    
    });


    describe('DELETE REQUEST /orders/1', () => {
        it('should return response with statusCode 401 when trying to delete an order wich doesnt exist ', async () => {
            res = await request
                .delete('/orders/10')
                .send({ token: token })
                .set('Authorization', `Bearer ${token}`)

            testedOrders = res.body
        
            expect(res.status).toEqual(401)
        });

     
    });

});






