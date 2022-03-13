 import app from '../server';
import supertest from 'supertest';
import { Equipment } from '../models/equipments';

const request = supertest(app);

let testedEquip: Equipment;
let testedEquipments: Equipment[];
let token: string;
let res: supertest.Response;


describe('EQUIPMENT ENDPOINTS', () => {
    beforeAll(async () => {
        const res = await request.post('/users').send({ username: 'mohamed', password: 'test123' }).set('Authorization', `Bearer ${token}`);
        token = res.body;
    });

    afterAll(async () => {
        const res = await request.delete('/users/1').send({ token: token }).set('Authorization', `Bearer ${token}`);
    });

    describe('POST REQUEST  /equipments', () => {
        it('should return a statusCode 401 when fails to create', async () => {
            res = await request.post('/equipments').send({
                name: 'TCM',
                price: "175000",
                category: 'FORKLIFT'
                
            }).set('Authorization', `Bearer ${token}`)
            testedEquip = res.body
            expect(res.status).toEqual(401);
        });

        it('should return status 400 with no token', async () => {
            res = await request
                .post('/equipments')
                .send({ name: 'TCM', price: 175000, category: 'FORKLIFT' })

            expect(res.status).toEqual(401)
        });


        it('should return a response with status 404 when sending wrong request', async () => {
            res = await request
                .post('/equipmen')
                .send({ name: 'TCM', price: 175000, category: 'FORKLIFT' })
                 testedEquip = res.body;
                    expect(res.status).toEqual(404);
        });
    

    });



    describe('GET REQUEST /equipments', () => {
        it('should return a response with statusCode 200', async () => {
            res = await request
                .get('/equipments')

            testedEquipments = res.body
        
            expect(res.status).toEqual(200)
        });


    });

    describe('GET REQUEST to show a specific equipment /equipments/1', () => {
        it('should return a response with status 200', async () => {
            res = await request
                .get('/equipments/1')

            testedEquip = res.body
        
            expect(res.status).toEqual(200)
        });
    });

    describe('DELETE REQUEST  /equipments/5', () => {
        it('should return a response with statusCode 401 when trying to delete an equipment which did not exist', async () => {
            res = await request
                .delete('/equipments/5')
                .send({ token: token })
                .set('Authorization', `Bearer ${token}`)

            testedEquipments = res.body
        
            expect(res.status).toEqual(401)
        });
        it('should return an empty equipments', async () => {
            res = await request
                .get('/equipments')
            expect(res.body).toEqual([])
        });
    });

});

 