const express = require('express')
const stripe = require('stripe')('sk_test_gGJy8Kzf6nIVcQKGltyvWUV400bZgJaYil');
const bodyParser = require('body-parser')

const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
