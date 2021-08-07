const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
require('dotenv').config()
//Default route
app.get('/', (req, res) => {
  res.send('Node JWT Authentication!')
})

//URL routes
const auth = require("./routes/auth");
const recipes = require("./routes/recipes");

app.use("/auth", auth);
app.use("/recipes", recipes);

//start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})