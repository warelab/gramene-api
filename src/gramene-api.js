var Sage = require("sage");
var http = require("http");
var util = require("util");

var service = new Sage.Service({
    initialize: function () {
        var self = this;
        self.registry().done(function (registry) {
            var ensembl = registry.find("name", "ensembl");
            
            var Gene     = Sage.Resource.extend({ name: { type: "string" } });
            var Genes    = Sage.Collection.extend({ resource: Gene });
            var Feature  = Sage.Resource.extend();
            var Features = Sage.Collection.extend({ resource: Feature });
            var Genome   = Sage.Resource.extend({
                url: ensembl.url + "/assembly/info/<%= name %>",
                name: { type: "string", required: true }
            });
            var Genomes = Sage.Collection.extend({
                resource: Genome,
                url: ensembl.url + "/info/species",
                parse: function (data) {
                    return data.species;
                }
            });

            service.resource("gene",   Gene);
            service.resource("genome", Genomes);
        });
    }
});

/*
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
*/
module.exports = service;