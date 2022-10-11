const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.j3jgmrf.mongodb.net/?retryWrites=true&w=majority');
const cors = require('cors')
require('dotenv').config()
app.use(express.urlencoded());
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// mongoose model
const User = mongoose.model('User', { name: String });

app.post('/api/users', (req, res) => {
  const username = req.body.username
  res.send(username)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
