import express from 'express'
import { Liquid } from 'liquidjs'
import fs from 'fs'
import path from 'path'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Liquid als view engine
const engine = new Liquid({
  root: './views',      
  extname: '.liquid'    
})
// Liquid
const engine = new Liquid({ root: './views', extname: '.liquid' })
app.engine('liquid', engine.express())
app.set('views', './views')
app.set('view engine', 'liquid')

// data
// Data directus api
const PersonResponse = await fetch('https://fdnd.directus.app/items/person/179')
const PersonResponseJSON = await PersonResponse.json()

// Data Local Json 
const dataPath = path.join(process.cwd(), 'public', 'data', 'journal.json')
let posts = []
try {
  const raw = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  posts = Array.isArray(raw) ? raw : (raw.posts || [])
} catch { posts = [] }

const save = () => {
  fs.mkdirSync(path.dirname(dataPath), { recursive: true })
  fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2), 'utf-8')
}

// Routes
app.get('/', async function (request, response) {
  response.render('index.liquid')
app.get('/', (req, res) => {
  res.render('index', { person: PersonResponseJSON.data })
})

app.get('/journal', async function (request, response) {
  response.render('journal.liquid')
app.get('/journal', (req, res) => {
  res.render('journal', {
    posts,
  })
})

app.get('/create', async function (request, response) {
  response.render('create.liquid', 
    { person: json.data }
  )
})

app.use((req, res, next) => {
  res.status(404).render('404.liquid');
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Application started on http://localhost:${PORT}`)
app.get('/create', (req, res) =>
})
