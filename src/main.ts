import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { createReadStream } from 'node:fs'

import { parser } from './parser.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
)

app.get('/', (request, response) => {
  const stream = createReadStream(
    path.join(import.meta.dirname, '..', 'statistics.csv')
  )

  response.header('Content-Type', 'application/json')

  stream.pipe(parser({ delimiter: ';' })).pipe(response)
})

app.listen(3333, '0.0.0.0')
console.log('http://localhost:3333/')
