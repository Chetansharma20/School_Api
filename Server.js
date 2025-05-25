const express = require("express");
const schoolRoutes = require('./src/routes/schoolRoutes')
const app = express()
app.use(express.json());
app.use('/api', schoolRoutes);

app.listen(5000,()=>
{
    console.log("server started")
})