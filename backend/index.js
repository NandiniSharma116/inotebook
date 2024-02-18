const connectToMongo = require("./db");
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())

connectToMongo();
app.use(express.json());


//AVAILABLE ROUTES
app.use('/api/auth', require("./routes/auth"));
app.use('/api/notes', require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})