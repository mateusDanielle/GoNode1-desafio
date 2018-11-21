const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const checkAgeQueryMiddleware = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) return res.redirect(`/major?age=${age}`)
  return res.redirect(`/minor?age=${age}`)
})

app.get('/major', checkAgeQueryMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('major', { age: age })
})

app.get('/minor', checkAgeQueryMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age: age })
})

app.listen(3000)
