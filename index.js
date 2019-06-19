const express = require('express')
const stripe = require('stripe')('sk_test_gGJy8Kzf6nIVcQKGltyvWUV400bZgJaYil');
const bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all temaplate files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/charges', (req, res) => {
	var customerId = req.body.customer_id;
	stripe.charges.list({
		customer : customerId,
		limit : 10
	}, function(err, list) {
		if (err) {
			console.log(err, req.body)
			req.status(500).end()
		} else {
			res.status(200).send(list)
		}
	});	
});

app.get('/sofort_charge', (req, res) => {
	stripe.createSource({
  		type: 'sofort',
  		amount: 1099,
  		currency: 'eur',
  		redirect: {
    		return_url: 'https://minxli.com',
  		},
  		sofort: {
    		country: 'DE',
  		},
	}).then((source) => {
		res.status(200).send(source)
	}).catch((err) => {
		res.status(500).end()
	});
});


app.post('/charge', (req, res) => { 
	var customer = req.body.customer;
	var amount = req.body.amount;
	var currency = req.body.currency;

	stripe.charges.create({
		customer : customer,
		amount : amount,
		currency : currency
	}, function(err, charge) {
		if (err) {
			console.log(err, req.body)
			req.status(500).end()
		} else {
			res.status(200).send()
		}
	});	
});

app.post('/ephemeral_keys', (req, res) => { 
	var customerId = req.body.customer_id;
	var api_version = req.body.api_version;

	stripe.ephemeralKeys.create(
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