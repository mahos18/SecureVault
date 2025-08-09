const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/authRouter');
const homeRoutes = require('./routes/HomeRoutes') // Import the auth router
require('dotenv').config();
require('./models/db'); 

const PORT =process.env.PORT || 8080;
app.get('/',(req,res)=>{
    res.send("Hello world")
}) 
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',authRouter );
app.use('/home',homeRoutes);
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`)   
})
