let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET', () => {
    it('it should return a md5 hashed text in base64 format', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
			res.should.have.status(200);
			res.text.should.be.equal("Hello!\nPlease send a POST request to /hash with 'text:<textToHash>' and 'type:<hashingType>'!\nAllowed hashing types: md5, sha1, sha256, sha512");
			done();
        });
    });
});

describe('/POST', () => {
    it('it should return a md5 hashed text in base64 format', (done) => {
		let req = {
			type: "md5",
			text: "example"
        }
		
        chai.request(server)
        .post('/hash')
        .send(req)
        .end((err, res) => {
			res.should.have.status(200);
			res.text.should.be.equal("Gnmk1g3mcY6OWzJuM4rlMw==");
			done();
        });
    });
	
	it('it should return a invalid hash type error message', (done) => {
		let req = {
			type: "md65",
			text: "example"
        }
		
        chai.request(server)
        .post('/hash')
        .send(req)
        .end((err, res) => {
			res.should.have.status(400);
			res.text.should.be.equal("Invalid hash type!\nPlease choose one of the following : md5, sha1, sha256, sha512");
			done();
        });
    });
});