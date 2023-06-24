const request = require("supertest")("https://kasir-api.belajarqa.com"); //baseurl dlm string

const expect = require("chai").expect;
const userData = require("../../data/userData-login")

var token = ""

describe("Login User ", function(){
    //Test case negative
    it("Login Gagal", async function(){
        const data = {
            email:"contoh@gmail.com",
            password:"test"
        };   

        const response = await request
                    .post("/authentications")
                    .send({
                        "email":data.email,
                        "password":data.password
                    });
        expect(await response.status).to.eql(401);
        expect(await response.body.status).to.eql("fail")
        expect(await response.body.message).to.eql("Kredensial yang Anda berikan salah")
    })

    //Test case possitive
    it("Login Berhasil", async function(){
        const response = await request
                    .post("/authentications")
                    .send({
                        "email":userData.USER_DATA.email,
                        "password":userData.USER_DATA.password
                    });
        expect(await response.status).to.eql(201);
        expect(await response.body.status).to.eql("success")
        expect(await response.body.message).to.eql("Authentication berhasil ditambahkan")
        expect(await response.body.data.accessToken).not.to.be.null;
        token = response.body.data.accessToken
        return token
    })
})

