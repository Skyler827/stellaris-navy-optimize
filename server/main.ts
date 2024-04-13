import express from 'express'
import path from 'path'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use('/static', express.static(path.join(__dirname, 'public')))
