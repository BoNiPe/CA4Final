global.TEST_DATABASE = "mongodb://bonipe:bonipe@ds053390.mongolab.com:53380/ca4test";

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer = "mongodb://bonipe:bonipe@ds053390.mongolab.com:53380/ca4test";
var mongoose = require("mongoose");
var wikiModel = mongoose.model("wikiPedia");

describe('REST API for /wiki', function () {
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    beforeEach(function (done) {
        wikiModel.remove({}, function () {
            var array = [{
                "title": "Nick Title",
                "url": "http://Nick.com",
                "abstract": "Nick Abstract",
                "categories": [
                    "Nick Category"
                ],
                "headings": [
                    {
                        "heading": "Heading 1",
                        "position": "1"
                    },
                    {
                        "heading": "Heading 2",
                        "position": "2"
                    }
                ],
                "links": [
                    "http://Nick.com"
                ]
            },
                {
                    "title": "Boyko Title",
                    "url": "http://Boyko.com",
                    "abstract": "Boyko Abstract",
                    "categories": [
                        "Boyko Category"
                    ],
                    "headings": [
                        {
                            "heading": "Heading 3",
                            "position": "1"
                        },
                        {
                            "heading": "Heading 2",
                            "position": "2"
                        }
                    ],
                    "links": [
                        "http://Boyko.com"
                    ]
                }];
            wikiModel.create(array, function (err) {
                done();
            });
        });
    })

    after(function () {
        //Removing db after test are done
        mongoose.connection.db.dropDatabase();
        testServer.close();
    })

    it("Should get all Wiki Objects - Nick and Boyko", function (done) {
        http.get("http://localhost:" + testPort + "/api/wiki", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                n[0].title.should.equal("Nick Title");
                n[1].title.should.equal("Boyko Title");
                done();
            });
        })
    });

    it("Should get a Title and Abstracts of all objects", function (done) {
        http.get("http://localhost:" + testPort + "/api/titleabstract", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                n[0].title.should.equal("Nick Title");
                n[1].title.should.equal("Boyko Title");
                n[0].abstract.should.equal("Nick Abstract");
                n[1].abstract.should.equal("Boyko Abstract");
                n[0]._id.should.be.length(24);
                n[1]._id.should.be.length(24);
                done();
            });
        })
    });

    it("Should get Boyko's Wiki Object by his ID taken from 'all-titles-and-abstracts' call", function (done) {
        http.get("http://localhost:" + testPort + "/api/titleabstract", function (res) {
            res.setEncoding("utf8");
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                var boykoID = n[1]._id;
                n[1].title.should.equal("Boyko Title");
                n[1]._id.should.be.length(24);
                n.length.should.equal(2);
                http.get("http://localhost:" + testPort + "/api/wiki/" + boykoID, function (res) {
                    res.setEncoding("utf8");
                    res.on("data", function (chunk) {
                        var v = JSON.parse(chunk);
                        v.length.should.equal(1);
                        v[0]._id.should.be.length(24);
                        v[0].title.should.equal("Boyko Title");
                        v[0].url.should.equal("http://Boyko.com");
                        v[0].abstract.should.equal("Boyko Abstract");
                        //##You did not give us some reasonable explanation about the quotes so this test is 4 you :)
                        //v[0].categories.should.equal(['Boyko Category']); etc...
                        done();
                    });
                });
            });
        })
    });

    it("Should get all Categories", function (done) {
        http.get("http://localhost:" + testPort + "/api/categories", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                //n[0].categories.should.equal(['Nick Category']);
                //n[0].categories.should.equal(['Boyko Category']); etc...
                done();
            });
        })
    });

    it("Should get category called 'Boyko Category'", function (done) {
        http.get("http://localhost:" + testPort + "/api/categories/Boyko Category", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(1);
                n[0]._id.should.be.length(24);
                n[0].title.should.equal("Boyko Title");
                n[0].url.should.equal("http://Boyko.com");
                n[0].abstract.should.equal("Boyko Abstract");
                //n[0].categories.should.equal(['Boyko Category']); etc...
                done();
            });
        })
    });

    it("Should add new Wiki Object - Peter", function (done) {
        var request = require('request');
        request({
                method: 'POST',
                url: "http://localhost:" + testPort + "/api/newWiki",
                headers: {'Content-Type': 'application/json'},
                json: {
                    "title": "Peter Title",
                    "url": "http://Peter.com",
                    "abstract": "Peter Abstract",
                    "categories": [
                        "Peter Category"
                    ],
                    "headings": [
                        {
                            "heading": "Heading 69",
                            "position": "1"
                        },
                        {
                            "heading": "Heading 2",
                            "position": "2"
                        }
                    ],
                    "links": [
                        "http://Peter.com"
                    ]
                }
            },
            function (error, response, body) {
                response.statusCode.should.equal(200);
                //First we test if the changed user is returned in the PUT's response.
                body.title.should.equal("Peter Title");
                body.url.should.equal("http://Peter.com");
                body.abstract.should.equal("Peter Abstract");
                //body.links.should.equal("http://Peter.com"); ..etc

                //Then we check whether it actually was changed in the DataBase
                http.get("http://localhost:" + testPort + "/api/wiki", function (res) {
                    res.setEncoding("utf8");
                    res.on("data", function (chunk) {
                        var n = JSON.parse(chunk);
                        var peterID = n[2]._id;
                        n[2].title.should.equal("Peter Title");
                        n[2]._id.should.be.length(24);
                        n.length.should.equal(3);
                        http.get("http://localhost:" + testPort + "/api/wiki/" + peterID, function (res) {
                            res.setEncoding("utf8");
                            res.on("data", function (chunk) {
                                var v = JSON.parse(chunk);
                                v.length.should.equal(1);
                                v[0]._id.should.be.length(24);
                                v[0].title.should.equal("Peter Title");
                                v[0].url.should.equal("http://Peter.com");
                                v[0].abstract.should.equal("Peter Abstract");
                                //##You did not give us some reasonable explanation about the quotes so this test is 4 you :)
                                //v[0].categories.should.equal(['Boyko Category']); etc...
                                done();
                            });
                        });
                    });
                })
            })
    });

    it("Should get 404 aka Not Found", function (done) {
        http.get("http://localhost:" + testPort + "/api/IMakeAwesomeTests", function (res) {
            res.statusCode.should.equal(404);
            done();
        })
    });
});


