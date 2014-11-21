var mongoose = require( 'mongoose' );
var dbURI;

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
  //dbURI = 'mongodb://localhost/wiki';
  dbURI = 'mongodb://bonipe:bonipe@ds053380.mongolab.com:53380/ca4';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/** Wikipedia SCHEMA **/
var wikiSchema = new mongoose.Schema({
  title : {type: String, unique: true},
  url: String,
  abstract: String,
  categories: [String],
  links: [String],
  headings : [{heading: String, position: String}]
});

mongoose.model( 'wikiPedia', wikiSchema,"wiki" );
