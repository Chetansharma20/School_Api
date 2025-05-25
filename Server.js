const express = require("express");
const schoolRoutes = require('./src/routes/schoolRoutes')
const app = express()
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to School Management API. Use /api/addSchool and /api/listSchools endpoints.');
});


app.use('/api', schoolRoutes);

app.listen(5000,()=>
{
    console.log("server started")
})