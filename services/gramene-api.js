var Service = require('../sage/src/service.js');

var service = new Service();

service.get('/genome/:genomeId', function (req, res, next) {
    // TODO: Return genome resource.
    res.send({
        message: "SOS"
    });
});

service.start({ port: 4747 });