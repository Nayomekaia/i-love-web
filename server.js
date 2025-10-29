import express from 'express'
import { Liquid } from 'liquidjs'

const app = express()

app.use(express.static('public'))

// Liquid als view engine
const engine = new Liquid({
  root: './views',      
  extname: '.liquid'    
})
app.engine('liquid', engine.express())
app.set('views', './views')
app.set('view engine', 'liquid')

// Routes
app.get('/', async function (request, response) {
  response.render('index.liquid')
})

app.get('/journal', async function (request, response) {
  response.render('journal.liquid')
})

app.get('/create', async function (request, response) {
  response.render('create.liquid')
})

app.use((req, res, next) => {
  res.status(404).render('404.liquid');
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Application started on http://localhost:${PORT}`)
})
