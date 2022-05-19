// const {iteratee} = require('lodash');
// const supertest = require('supertest');
// const app = require('../../../index');
// const {Genre} = require('../../../models/genreModel');
// const req = supertest(app);
// const mongoose = require('mongoose');
// const {User} = require('../../../models/userModel');


// describe('api/genres', () => {
//     afterEach(async () => {
//         await Genre.deleteMany({});
//     });
//     describe('GET /', () => {
//         it('should return all the genres', async () => {
//             await Genre.collection.insertMany([
//                 {
//                     name: "genre1"
//                 }, {
//                     name: "genre2"
//                 }
//             ]);
//             const res = await req.get('/api/genres');
//             expect(res.status).toBe(200);
//             expect(res.body.length).toBe(2);
//             expect(res.body.some((g) => g.name == "genre1")).toBeTruthy();
//             expect(res.body.some((g) => g.name == "genre2")).toBeTruthy();
//         });
//         it("should return 404 if genre are not found", async () => {
//             const res = await req.get("/api/genres");
//             expect(res.status).toBe(404);
//         });
//     });
//     describe("GET /:id", () => {
//         it("should return 400 if  invalid id is passed", async () => {
//             const res = await req.get("/api/genres/1");
//             expect(res.status).toBe(400);
//         });
//         it("should return 404 if  valid id passed but genre not found", async () => {
//             const id = new mongoose.Types.ObjectId();
//             const res = await req.get("/api/genres/", id);
//             expect(res.status).toBe(404);
//         });
//         it("should return 200  when valid id passed", async () => {
//             const genre = new Genre({name: "genre1"});
//             await genre.save();
//             const res = await req.get("/api/genres/" + genre._id);
//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty("_id", genre._id.toHexString());
//             expect(res.body).toHaveProperty("name", genre.name);
//         });


//     });
//     describe("POST /", () => {
//         it("should return  401 for unauthorized request", async () => {
//             const res = await req.post("/api/genres");
//             expect(res.status).toBe(401);
//         });
//         it("should return  404 if  input  less than 3 character ", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             const res = await req.post("/api/genres").set("x-auth-token", token).send({name: "RI"});
//             expect(res.status).toBe(404);
//         });
//         it("should return  404 if invalid input greater than 20 charecter genre", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             const res = await req.post("/api/genres").set("x-auth-token", token).send({name: "mynameisgreaterthantwentycharacterlong"});
//             expect(res.status).toBe(404);
//         });
//         it("should save the genre", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             await req.post("/api/genres").set("x-auth-token", token).send({name: "genre1"});
//             const genre = await Genre.findOne({name: "genre1"});
//             expect(genre).not.toBeNull();
//             expect(genre).toHaveProperty("name", "genre1");
//         });
//         it("should return the genre", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             const res = await req.post("/api/genres").set("x-auth-token", token).send({name: "genre1"});

//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty("name", "genre1");
//         });
//     });
//     describe("PUT /:id", () => {
//         it("should return 400 if invalid id is passed", async () => {
//             const res = await req.put("/api/genres/1");
//             expect(res.status).toBe(400);
//         });

//         it("should return 404 if  valid id passed with correct format but genre not found", async () => {
//             const id = new mongoose.Types.ObjectId();
//             const res = await await req.put("/api/genres/", id);
//             expect(res.status).toBe(404);
//         });

//         it("should return  400 if token is invalid", async () => {
//             const res = await req.put("/api/genres/1").set("x-auth-token", "a");
//             expect(res.status).toBe(400);
//         });

//         it("should return 404 if put data is less than 3 character", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             const genre = new Genre({name: "genre1"});
//             await genre.save();
//             const res = await req.put("/api/genres/" + genre._id).set("x-auth-token", token).send({name: "pe"});
//             expect(res.status).toBe(404);
//         });

//         it("should return 404 if put data is greater than 20 character", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             const genre = new Genre({name: "genre1"});
//             await genre.save();
//             const res = await req.put("/api/genres/" + genre._id).set("x-auth-token", token).send({name: "mynameisgreaterthantwentycharacterslong"});
//             expect(res.status).toBe(404);
//         });
//         it("should return 404 objectid does not exist", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             const res = await req.put("/api/genres/").set("x-auth-token", token).send({name: "RISHABH"});
//             expect(res.status).toBe(404);
//         });

//         it("should return the genre", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             const genre = new Genre({name: "genre1"});
//             await genre.save();
//             const res = await req.put("/api/genres/" + genre._id).set("x-auth-token", token).send({name: "RISHABH"});
//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty("name", "RISHABH");
//         });

//         it("should save the genre", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             let genre = new Genre({name: "genre1"});
//             await genre.save();
//             await req.put("/api/genres/" + genre._id).set("x-auth-token", token).send({name: "rishabh"});
//             genre = await Genre.findOne({name: "rishabh"});
//             expect(genre).not.toBeNull();
//             expect(genre).toHaveProperty("name", "rishabh");
//         });
//     });

//     describe("DELETE /:id", () => {
//         it("should be only deleted by admin", async () => {
//             const user = new User();
//             const token = user.getAuthToken();
//             const genre = new Genre({name: "genre1"});
//             await genre.save();
//             const res = await req.delete("/api/genres/", genre._id).set("x-auth-token", token);
//             expect(res.status).toBe(404);
//         });

//         it("should return 400 if invalid id is passed", async () => {
//             const res = await req.delete("/api/genres/1");
//             expect(res.status).toBe(400);
//         });
//         it("should return 404 objectid does not exist ", async () => {
//             const user = new User({isAdmin: true});
//             const token = user.getAuthToken();
//             const res = await req.delete("/api/genres/").set("x-auth-token", token);
//             expect(res.status).toBe(404);
//         });

//         it("should return 404 if  valid id passed with correct format but genre not found", async () => {
//             const user = new User({isAdmin: true});
//             const token = user.getAuthToken();
//             const id = new mongoose.Types.ObjectId();
//             const res = await req.delete("/api/genres/", id).set("x-auth-token", token);
//             expect(res.status).toBe(404);
//         });

//         it("should return  400 if token is invalid", async () => {
//             const res = await req.delete("/api/genres/1").set("x-auth-token", "a");
//             expect(res.status).toBe(400);
//         });


//         it("should return the genre", async () => {
//             const user = new User({isAdmin: true});
//             const token = user.getAuthToken();
//             const genre = new Genre({name: "genre1"});
//             await genre.save();
//             const res = await req.delete("/api/genres/" + genre._id).set("x-auth-token", token);
//             expect(res.status).toBe(200);
//         });

//         it("should save the genre", async () => {
//             const user = new User({isAdmin: true});
//             const token = user.getAuthToken();
//             let genre = new Genre({name: "genre1"});
//             await genre.save();
//             const res = await req.delete("/api/genres/" + genre._id).set("x-auth-token", token);
//             expect(res.body).toHaveProperty("name", genre.name);
//         });
//     });
// });
