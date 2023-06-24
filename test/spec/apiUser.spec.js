const request = require("supertest")("https://kasir-api.belajarqa.com"); //baseurl dlm string

const expect = require("chai").expect;
const userData = require("../../data/userData-login")

var token = "";
var userId = "";

describe("GetToken", function(){
    it("tokenUser", async function(){   
        const data = {
            "email":userData.USER_DATA.email,
            "password":userData.USER_DATA.password
        } 
        const response = await request
                        .post("/authentications")
                        .send(data)
        expect(await response.status).to.eql(201);
        expect(await response.body.data.accessToken).not.to.be.null;
        token = response.body.data.accessToken
        return token
    })
})

//Create User
describe("Create User",function(){
    //Test case negative
    it("Create User Gagal",async function(){
        const data = {
            name :"user",
            email:"user",
            password:"user"
        }; 
        const response = await request
                        .post("/users")
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        .send({
                            "name":data.name,
                            "email":data.email,
                            "password":data.password
                        })
        expect(await response.status).to.be.eql(400);
        expect(await response.body.status).to.eql("fail")
        expect(await response.body.message).to.eql("\"email\" must be a valid email")
    })

    //Test case possitive
    it("Create User Berhasil",async function(){
        const data = {
            name :"user",
            email:"user@gmail.com",
            password:"user123"
        }; 
        const response = await request
                        .post("/users")
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        .send({
                            "name":data.name,
                            "email":data.email,
                            "password":data.password
                        })
        expect(await response.status).to.be.eql(201);
        expect(await response.body.status).to.eql("success")
        expect(await response.body.message).to.eql("User berhasil ditambahkan")
        expect(await response.body.data.userId).not.to.be.null;
        userId = response.body.data.userId
        return userId
    })
})

//Get detail User
describe("Get User Detail",function(){
    it("Get User Detail Berhasil", async function(){
        const response = await request
                        .get(`/users/${userId}`)
                        .set({
                            Authorization: `Bearer ${token}`
                        })
        expect(await response.status).to.eql(200);
        expect(await response.body.status).to.eql("success")
    })
})

//Update User
describe("Update User",function(){
    const data = {
        email:"user",
        password:"user"
    };
    it("Update User Gagal", async function(){
        const response = await request
                        .put(`/users/${userId}`)
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        .send({
                            "name" : data.email,
                            "email" : data.password
                        })
        expect(await response.status).to.eql(400);
        expect(await response.body.status).to.eql("fail")
        expect(await response.body.message).to.eql("\"email\" must be a valid email")
    })

    //Update User Berhasil
    it("Update User Berhasil", async function(){
        const data = {
            name :"userUpdate",
            email:"userUpdate@gmail.com",
        };
        const response = await request
                        .put(`/users/${userId}`)
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        .send({
                            "name" : data.name,
                            "email" : data.email
                        })
        expect(await response.status).to.eql(200);
        expect(await response.body.status).to.eql("success")
        expect(await response.body.message).to.eql("User berhasil diupdate")
    })
})

//Delate User
describe("Delate User",function(){
    it("Delate User Berhasil", async function(){
        const response = await request
                        .get(`/users/${userId}`)
                        .set({
                            Authorization: `Bearer ${token}`
                        })
        expect(await response.status).to.eql(200);
        expect(await response.body.status).to.eql("success")
    })
})
    






