const express = require("express");
const mainRouter = require("./src/routes/index");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); 


app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",

    credentials: true
  }));
  
  
app.use(morgan('dev'));


app.use("/api/v1", mainRouter);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});