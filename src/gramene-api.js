var http        = require("http");
var Sage        = require("sage");
var util        = require("util");
var ensemblConf = require("../conf/ensembl.json");

var service = new Sage.Service();
service.resource("gene", new Sage.Resource({}));
service.resource("genome", new Sage.Resource({}));

var ENS_URLS = {
    chrInfo:  "/assembly/info/%s/%s",
    assembly: "/assembly/info/%s",
    gene: "/feature/id/%s?feature=gene",
};

var GRM_URLS = {
    chr: "/genome/%s/chromosome/%s",
};

function ensemblGET(path, callback) {
    http.get({
        host: ensemblConf.host,
        port: ensemblConf.port,
        path: path,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (response) {
        response.setEncoding('utf8');
        response.on('data', callback);
    });
}

service.get('/genome/:species', function (req, res, next) {
    ensemblGET(util.format(ENS_URLS.assembly, req.params.species),
    function (json) {
        var assembly = JSON.parse(json);
        var genome = { chromosomes: [] };
        assembly.top_level_seq_region_names.forEach(function (chr) {
            genome.chromosomes.push({
                name: chr,
                uri: util.format(GRM_URLS.chr, req.params.species, chr)
            });
        });
        res.send(genome);
    });
});

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