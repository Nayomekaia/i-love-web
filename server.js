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
app.get('/', (req, res) => {
  res.render('index', { title: 'I Love Web', message: 'Hello from Liquid!' })
})

app.get('/health', (req, res) => res.type('text').send('ok'))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Application started on http://localhost:${PORT}`)
})
