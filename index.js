const express = require('express')
const stripe = require('stripe')('sk_test_gGJy8Kzf6nIVcQKGltyvWUV400bZgJaYil');
const bodyParser = require('body-parser')
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all temaplate files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/ephemeral_keys', (req, res) => { 
	var customerId = req.body.customer_id;
	var api_version = req.body.api_version;

	stripe.ephemeral.create(
		{customer : customerId},
		{stripe_version : api_version}
	).then((key) => {
		res.status(200).send(key)
	}).catch((err) => {
		res.status(500).end()
	});
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});