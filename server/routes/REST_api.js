var express = require('express');
var router = express.Router();

var dataLayerModel = require('../model/dataLayer');

router.get('/wiki', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    dataLayerModel.getAllWikis(function (err, allWikis) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(allWikis));
    })
});

router.get('/wiki/:id', function (req, res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    dataLayerModel.getParticularWikiByID(id, function (err, currentWiki) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentWiki));
    })
});

router.get('/categories', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    dataLayerModel.getAllCategories('categories', function (err, allCat) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(allCat));
    })
});

router.get('/titleabstract', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    dataLayerModel.getAllTitlesAndAbstracts('title abstract',function (err, result) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(result));
    })
});

router.get('/categories/:category', function(req, res){
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    var category = req.params.category;
    dataLayerModel.getTitlesByCategory('title', category, function (err, result) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(result));
    })
});

router.post('/newWiki', function(req,res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    var createdUser = req.body;
    dataLayerModel.createWiki(createdUser, function (err, result) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(result));
    })

});

module.exports = router;
