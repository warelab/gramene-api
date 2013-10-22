var supertest = require("supertest");
var API       = require("../src/gramene-api");

describe("API", function () {
    it("should be a single object", function () {
        API.should.be.an.Object;
    });
});