const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express()

app.use(morgan('dev'))
app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.enable('trust proxy')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

router(app)

// Answer API requests.
// app.get('/api', function(req, res) {
//   res.set('Content-Type', 'application/json')
//   res.json('{"message":"Hello from the custom server!"}')
// })

app.listen(PORT, function() {
  console.error(`Node API Server ${process.pid}: listening on port ${PORT}`)
})
