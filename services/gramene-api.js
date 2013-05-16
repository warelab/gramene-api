var http    = require("http");
var Service = require('../sage/src/service.js');
var ensemblConf = require("../conf/ensembl.json");

var service = new Service();

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

service.get('/genome/:genomeId', function (req, res, next) {
    ensemblGET('/assembly/info/' + req.params.genomeId,
    function (json) {
        var assembly = JSON.parse(json);
        var genome = { chromosomes: [] };
        assembly.top_level_seq_region_names.forEach(function (chr) {
            genome.chromosomes.push({
                name: chr,
                uri: "http://api.gramene.org/genome/" +
                    req.params.genomeId +
                    "/chromosome/" + chr
            });
        });
        res.send(genome);
    });
});

// TODO: Have caller start/stop service.
service.start({ port: 4747 });