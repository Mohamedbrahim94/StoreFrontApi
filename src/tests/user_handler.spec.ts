import app from "../server";
import { User } from "../models/users";
import supertest from "supertest";


const request = supertest(app);

let testedUsers: User[];
let testedUser: User;
let token: string;
let res: supertest.Response;

describe('USER RESTful ENDPOINT', () => {
   
    describe('POST REQUEST /users ', () => {
        it('should return a token and status 200 OK ', async () => {
            res = await request.post('/users').send({
                username: "mohamed_ibra20",
                password: "secretpasswordibrahim",
                firstname: "mohamed",
                lastname: "ibrahim",
                email: "mohamedibrahim@gmail.com",
                user_role: "ADMIN",
            });
            token = res.body;
            expect(res.status).toEqual(200);
        });
        
    });


    describe('GET REQUEST /users', () => {
        it('should return response of all users with status code 200 OK', async () => {
            res = await request.get('/users').send({ token: token }).set('Authorization', `Bearer ${token}`);
            testedUsers = res.body;
            testedUser = testedUsers[testedUsers.length - 1];
            expect(res.status).toEqual(200);
        });

        it('should return index of all users', () => {
            expect(res.body).toContain(jasmine.objectContaining({
                username: "mohamed_ibra20",
                firstname: "mohamed",
                lastname: "ibrahim",
                email: "mohamedibrahim@gmail.com",
                user_role: "ADMIN",
            }));
               
           })
    });


    describe("GET /users/2", () => {
        it('should return a statusCode 200', async () => {
            res = await (await request.get(`/users/${testedUser.id}`).send({ token: token }).set('Authorization', `Bearer ${token}`));
                
            expect(res.status).toEqual(200);
        });


        it('should return user', () => {
            expect(res.body).toEqual(jasmine.objectContaining({
                username: "mohamed_ibra20",
                firstname: "mohamed",
                lastname: "ibrahim",
                email: "mohamedibrahim@gmail.com",
                user_role: "ADMIN",
            }));
        });

    });


    describe("DELETE /users/3", () => {
        it('should return a status code 200', async () => {
            res = await request.delete(`/users/${testedUser.id}`).send({ token: token }).set('Authorization', `Bearer ${token}`)
            expect(res.status).toEqual(200)
        });

        it('should return users without the deleted user', async () => {
            res = await request.get('/users').send({ token: token }).set('Authorization', `Bearer ${token}`)
            expect(res.body.length).toEqual(testedUsers.length - 1)

        });

    });


    
   
});

