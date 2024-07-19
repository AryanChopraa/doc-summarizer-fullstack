const express = require("express");
const mainRouter = require("./src/routes/index");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); 
require('dotenv').config()



app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
  
  
app.use(morgan('dev'));

app.options('/keep-me-alive', cors()); 
app.get('/keep-me-alive', cors(), (req, res) => {
  res.status(200).send('I am alive');
});

app.use("/api/v1", mainRouter);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});