var Sage        = require("sage");
var http        = require("http");
var util        = require("util");

var ensemblConf = require("../conf/ensembl.json");

var service = new Sage.Service();

var Gene   = Sage.Resource.extend();
var Genes  = Sage.Collection.extend({ resource: Gene });

var Genome = Sage.Resource.extend();
var Genomes = Sage.Collection.extend({
    resource: Genome,
    url: "http://brie.cshl.edu:3000/info/species",
    parse: function (data) {
        return data.species;
    }
});

service.resource("gene",   Gene);
service.resource("genome", Genomes);

var ENS_URLS = {
    chrInfo:  "/assembly/info/%s/%s",
    assembly: "/assembly/info/%s",
    gene: "/feature/id/%s?feature=gene",
};

service.get('/genome/:species/chromosome/:chr',
function (req, res, next) {
    ensemblGET(util.format(ENS_URLS.chrInfo,
        req.params.species,
        req.params.chr
    ), function (json) {
        res.send(JSON.parse(json));
    });
});

// service.get('/gene/:id', function (req, res, next) {
//     console.log("Getting gene by ID");
//     ensemblGET(util.format(ENS_URLS.gene,
//         req.params.id
//     ), function (json) {
//         res.send(JSON.parse(json));
//     });
// });
// 
module.exports = service;