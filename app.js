var express = require('express');
var crypto = require('crypto');
var cors = require('cors')

var app = express();

var types = ["sha1", "md5", "sha256", "sha512"]

app.use(cors())

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
	res.end("Hello!\nPlease send a POST request to /hash with 'text:<textToHash>' and 'type:<hashingType>'!\nAllowed hashing types: md5, sha1, sha256, sha512");
})

app.post('/hash', (req, res) => {
	if (!types.includes(req.body.type)) {
		res.statusCode = 400;
		res.end("Invalid hash type!\nPlease choose one of the following : md5, sha1, sha256, sha512");
	} else {
		res.end(crypto.createHash(req.body.type).update(req.body.text).digest('base64'));
	}
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Backend app listening at http://%s:%s", host, port)
})

module.exports = server
