var supertest = require("supertest");
var Sage      = require("sage");
Sage.Service.logLevel("fatal");
var API       = require("../src/gramene-api");

describe("API", function () {
    it("should be a single object", function () {
        API.should.be.an.Object;
    });
    it("should include top-level resources", function (done) {
        API.listen(12345);
        supertest(API).get("/").end(function (err, res) {
            [err].should.be.null;
            res.body.should.eql({
                resources: {
                    "http://0.0.0.0:12345/gene": {},
                    "http://0.0.0.0:12345/genome": {}
                }
            });
            done();
        });
    });
});