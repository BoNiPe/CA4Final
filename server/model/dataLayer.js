var mongoose = require('mongoose');
var wikiModel = mongoose.model('wikiPedia');

//##FIND ALL WIKIS###
function getAllWikis(callback) {
    wikiModel.find({}, function (err, allWikis) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            } else {
                callback(null, allWikis);
            }
        }
    )
}

//##GET ALL CATEGORIES###
function getAllCategories(selection, callback) {
    wikiModel.find({}).distinct(selection).exec(function (err, result) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            } else {
                callback(null, result);
            }
        }
    )
};

//##FIND ALL TITLES AND ABSTRACTS YOU WANT###
function getAllTitlesAndAbstracts(selection, callback) {
    wikiModel.find().select(selection).exec(function (err, result) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            } else {
                callback(null, result);
            }
        }
    )
};

//##GET TITLES BY CATEGORY ID##
//Cause of some problems, which I cannot figure out this method cannot work with .select or .distinct :/
function getTitlesByCategory(selection, category, callback) {
    wikiModel.find({categories: category},function (err, particularTitles) {
        if (err) {
            callback(err)
        }
        callback(null, particularTitles)
    })

};

//##FIND WIKI BY TITLE###
function getParticularWikiByID(id, callback) {
    wikiModel.find({_id: id}, function (err, particularWiki) {
        if (err) {
            callback(err);
        }
        callback(null, particularWiki);
    });
}

//##ADD WIKI###
function createWiki(actualWiki, callback) {
    wikiModel.create(actualWiki ,function (err, createdWiki) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        callback(null, createdWiki);
    });
}

module.exports = {
    getAllWikis: getAllWikis,
    getAllCategories: getAllCategories,
    getAllTitlesAndAbstracts: getAllTitlesAndAbstracts,
    getTitlesByCategory: getTitlesByCategory,
    getParticularWikiByID: getParticularWikiByID,
    createWiki: createWiki
}