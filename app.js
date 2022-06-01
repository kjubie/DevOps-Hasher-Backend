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

app.get('/hash', (req, res) => {
	res.end("hello!");
})

app.post('/hash', (req, res) => {
	console.log(crypto.createHash(req.body.type).update(req.body.text).digest('base64'));
	if (!types.includes(req.body.type))
		res.end("Invalid hash type!\nPlease choose one of the following : md5, sha1, sha256, sha512");
	else
		res.end(crypto.createHash(req.body.type).update(req.body.text).digest('base64'));
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})