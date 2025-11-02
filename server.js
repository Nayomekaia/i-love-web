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
// Dynamic Routes
app.get('/journal/:id', (req, res) => {
  const key = String(req.params.id)
  const post = posts.find(p => String(p.id) === key || String(p.slug || '') === key)
  if (!post) return res.status(404).render('404', { message: 'Post niet gevonden' })
  res.render('detail', { post })
})

app.use((req, res, next) => {
  res.status(404).render('404.liquid');
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Application started on http://localhost:${PORT}`)
app.get('/create', (req, res) =>
app.post('/journal', (req, res) => {
  const { title, content, intro, subtitle, date, tags, slug } = req.body
  if (!title || !content) return res.redirect('/create?state=error')

  const id = Date.now()
  const baseSlug = ((slug && slug.trim()) || title)
    .toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')
  const finalSlug = posts.some(p => p.slug === baseSlug) ? `${baseSlug}-${id}` : baseSlug

  const newPost = {
    id,
    slug: finalSlug,
    title: title.trim(),
    subtitle: (subtitle || '').trim(),
    intro: (intro || '').trim(),
    content: content.trim(),
    date: (date && date.trim()) || new Date().toISOString().slice(0, 10),
    tags: (tags || '').split(',').map(t => t.trim()).filter(Boolean)
  }

  posts.unshift(newPost)
  save()
  res.redirect('/journal?state=created')
})

app.post('/journal/delete', (req, res) => {
  const len = posts.length
  posts = posts.filter(p => String(p.id) !== String(req.body.id))
  if (posts.length !== len) { save(); return res.redirect('/journal?state=deleted') }
  res.redirect('/journal?state=notfound')
})

app.use((req, res) => res.status(404).render('404'))
