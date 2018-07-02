const express = require('express')
const cookieParser = require('cookie-parser')
const next = require('next')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.use(cookieParser())

  server.get('/view/signin', (req, res) => {
    if (req.cookies.token) {
      console.log('you are already logined')
      res.redirect('/')
    } else {
      return app.render(req, res, '/view/signin', req.query)
    }
  })

  server.get('/view/signup', (req, res) => {
    if (req.cookies.token) {
      console.log('you are already logined')
      res.redirect('/')
    } else {
      return app.render(req, res, '/view/signup', req.query)
    }
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
