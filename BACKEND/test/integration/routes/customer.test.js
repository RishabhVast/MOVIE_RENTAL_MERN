const supertest = require('supertest');
const app = require('../../../index');
const req = supertest(app);
const mongoose = require('mongoose');
const {Customer} = require('../../../models/customerModel');
const {User} = require('../../../models/userModel');


describe("/api/customers", () => {
    afterEach(async () => {
        await Customer.deleteMany({});
    });
    describe('GET / ', () => {
        it('should return all the customers', async () => {

            await Customer.collection.insertMany([
                {
                    name: "saket sharma"
                }, {
                    phone: "7020402206"
                }, {
                    isGold: true
                }
            ]);
            const res = await req.get('/api/customers');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some((c) => c.name == "saket sharma")).toBeTruthy();
            expect(res.body.some((c) => c.phone == "7020402206")).toBeTruthy();
            expect(res.body.some((c) => c.isGold == true)).toBeTruthy();

        });

        it('should return  404 if customer not found', async () => {
            const res = await req.get('/api/customers');
            expect(res.status).toBe(404);
        })
    });

    describe('GET /:id', () => {
        it('should return  404 if id not found', async () => {
            const res = await req.get('/api/customers/');
            expect(res.status).toBe(404);
        });

        it('should return 400 if invalid id is found', async () => {
            const res = await req.get('/api/customers/52458bf80f2bb53797f11a2');
            expect(res.status).toBe(400);
        });

        it('should return 400 if object id validation fails', async () => {
            const id = new mongoose.Types.ObjectId();
            const res = await req.get('/api/customers/' + id);
            expect(res.status).toBe(404);
        });

    });

    describe('POST /', () => {

        it('should return 401 if token not found ', async () => {
            const res = await req.post('/api/customers');
            expect(res.status).toBe(401);

        });

        it('should return 400 if invalid token', async () => {
            const res = await req.post('/api/customers').set('x-auth-token', 'token');
            expect(res.status).toBe(400);
        });
        it('should return 400 if invalid id is found', async () => {
            const res = await req.get('/api/customers/52458bf80f2bb53797f11a2');
            expect(res.status).toBe(400);
        });

        it('should return 400 if object id validation fails', async () => {
            const id = new mongoose.Types.ObjectId();
            const res = await req.get('/api/customers/' + id);
            expect(res.status).toBe(404);
        });

        it('should return 404 if  name is less than 5 characters long', async () => {
            const user = new User();
            const token = user.getAuthToken();
            const res = await req.post('/api/customers').set('x-auth-token', token).send({name: "deep"});
            expect(res.status).toBe(404);
        });
        it('should return 404 if  name is less than 5 characters long', async () => {
            const user = new User();
            const token = user.getAuthToken();
            const res = await req.post('/api/customers').set('x-auth-token', token).send({name: "deep"});
            expect(res.status).toBe(404);
        });
        it('should return 404 if  phone number greater than 7 character', async () => {
            const user = new User();
            const token = user.getAuthToken();
            const res = await req.post('/api/customers').set('x-auth-token', token).send({phone: "7020402206"});
            expect(res.status).toBe(404);
        });
        it('should save the customer successfully', async () => {
            const user = new User();
            const token = user.getAuthToken();
            await req.post('/api/customers').set('x-auth-token', token).send({name: 'rishabh', phone: '7020402206', isGold: true});;

            const customer = await Customer.findOne({name: 'rishabh'});
            expect(customer).not.toBeNull();
            expect(customer).toHaveProperty('name', 'rishabh');

        });

        it(' should return 200 is the customer is added successfully', async () => {
            const user = new User();
            const token = user.getAuthToken();
            const res = await req.post('/api/customers').set('x-auth-token', token).send({name: "rishabh", phone: "7020402206", isGold: true});

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'rishabh');
        });

        describe("PUT /:id", () => {
            it("should return 400 if invalid id is passed", async () => {
                const res = await req.put("/api/customers/1");
                expect(res.status).toBe(400);
            });
            it("should return 404 if  valid id passed with correct format but customer not found", async () => {
                const id = new mongoose.Types.ObjectId();
                const res = await req.put("/api/customers/", id);
                expect(res.status).toBe(404);
            });
            it("should return  400 if token is invalid", async () => {
                const res = await req.put("/api/customers/1").set("x-auth-token", "a");
                expect(res.status).toBe(400);
            });
            it("should return 404  if objectid does not exist  ", async () => {
                const user = new User();
                const token = user.getAuthToken();
                const res = await req.put("/api/customers/6249a0c6a41379804de56599").set("x-auth-token", token).send({name: "rishabh", phone: "7020402206", isGold: true});
                expect(res.status).toBe(404);
            });
            it("should return  400 if invalid input of name less than 5 character ", async () => {
                const user = new User();
                const token = user.getAuthToken();
                const customer = new Customer({name: "rishabh", phone: "7020402206", isGold: true});
                await customer.save();
                const res = await req.put("/api/customers/" + customer._id).set("x-auth-token", token).send({name: "ri", phone: "7020402206", isGold: true});
                expect(res.status).toBe(200);
            });
            it("should return  200 if invalid input of name greater than  15 character ", async () => {
                const user = new User();
                const token = user.getAuthToken();
                const customer = new Customer({name: "rishabh", phone: "7020402206", isGold: true});
                await customer.save();
                const res = await req.put("/api/customers/" + customer._id).set("x-auth-token", token).send({name: "nameismatchingthecharactercriteria", phone: "7020402206", isGold: true});
                expect(res.status).toBe(200);
            });
            it("should return  200 if invalid input of phone number greater than 10  character ", async () => {
                const user = new User();
                const token = user.getAuthToken();
                const customer = new Customer({name: "rishabh", phone: "7020402206", isGold: true});
                await customer.save();
                const res = await req.put("/api/customers/" + customer._id).set("x-auth-token", token).send({name: "rishabh", phone: "70204022062", isGold: true});
                expect(res.status).toBe(200);
            });
            it("should return  200 if invalid input of phone number less than 7  cherecter ", async () => {
                const user = new User();
                const token = user.getAuthToken();
                const customer = new Customer({name: "rishabh", phone: "7020402206", isGold: true});
                await customer.save();
                const res = await req.put("/api/customers/" + customer._id).set("x-auth-token", token).send({name: "rishabh", phone: "7020405", isGold: true});
                expect(res.status).toBe(200);
            });
            it("should return 200 status and the customer", async () => {
                const user = new User();
                const token = user.getAuthToken();
                let customer = new Customer({name: "rishabh", phone: "7020402206", isGold: true});
                await customer.save();
                const res = await req.put("/api/customers/" + customer._id).set("x-auth-token", token).send({name: "rishabh", phone: "7020402206", isGold: true});
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty("name", "rishabh");
            });
            it("should save the Customer", async () => {
                const user = new User();
                const token = user.getAuthToken();
                let customer = new Customer({name: "rishabh", phone: "7020402206", isGold: true});
                await customer.save();
                const res = await req.put("/api/customers/" + customer._id).set("x-auth-token", token).send({name: "rishabh", phone: "7020402206", isGold: true});

                customer = await Customer.findOne({name: "rishabh"});

                expect(customer).not.toBeNull();
                expect(customer).toHaveProperty("name", "rishabh");
            });
        });
    })

}); 
