var supertest = require("supertest");
var Sage      = require("sage");
Sage.Service.logLevel("fatal");
var API       = require("../src/gramene-api");

describe("API", function () {
    it("should be a single object", function () {
        API.should.be.an.Object;
    });
    it("should include top-level resources", function (done) {
        Sage.Registry.listen(4444);
        API.listen(12345);
        Sage.Registry.add({
            name: "ensembl",
            url: "http://0.0.0.0:11111"
        });
        Sage.Registry.add(API);

        // FIXME: should use events, not timeouts
        setTimeout(function () {
            supertest(API).get("/").end(function (err, res) {
                [err].should.be.null;
                res.body.should.eql({
                    resources: {
                        "http://0.0.0.0:12345/gene": {
                            name: { type: "string" }
                        },
                        "http://0.0.0.0:12345/genome": {
                            name: { type: "string", required: true }
                        }
                    }
                });
                done();
            });
        }, 200);
    });
});