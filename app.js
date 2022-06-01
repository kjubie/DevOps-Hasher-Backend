var express = require('express');
var crypto = require('crypto');
var app = express();

var types = ["sha1", "md5", "sha256", "sha512"]

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
	if (!types.includes(req.body.type))
		res.end("Invalid hash type!\nPlease choose one of the following : md5, sha1, sha256, sha512");
	else
		res.end(crypto.createHash(req.body.type).update(req.body.text).digest('base64'));
})

var server = app.listen(443, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})