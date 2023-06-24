const request = require("supertest")("https://kasir-api.belajarqa.com"); //baseurl dlm string

const expect = require("chai").expect;
const userData = require("../../data/userData-regis")

describe("Register User", function(){
    //Test case negative
    it("Register Gagal", async function(){
        const data = {
            name:"contoh",
            email:"",
            password:"test"
        };   
    
        const response = await request
                        .post("/registration")
                        .send({
                            "name":data.name,
                            "email":data.email,
                            "password":data.password
                        });
        expect(await response.status).to.eql(400);
        expect(await response.body.status).to.eql("fail")
        expect(await response.body.message).to.eql("\"email\" is not allowed to be empty")
    })

    //Test case postive
    it("Register Sukses", async function(){    
        const response = await request
                        .post("/registration")
                        .send({
                            "name":userData.USER_DATA.name,
                            "email":userData.USER_DATA.email,
                            "password":userData.USER_DATA.password
                        });
        expect(await response.status).to.eql(201);
        expect(await response.body.status).to.eql("success")
        expect(await response.body.message).to.eql("Toko berhasil didaftarkan")
        expect(await response.body.data.name).to.eql(userData.USER_DATA.name);
        expect(await response.body.data.email).to.eql(userData.USER_DATA.email);
    })
})

