const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.listen(4865, () => {
  console.log(`App listening at port 4865`)
})