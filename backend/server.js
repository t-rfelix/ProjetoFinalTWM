const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expressjwt = require("express-jwt");

const app = express();
const port = 5000;


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const secretkey = require("./config/config").secretKey;
app.use(expressjwt({ secret: secretkey, algorithms: ['HS256'] }).unless({ path: ['/users/login', '/users/register', '/questions/all'] }));


const db = require("./config/config").mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB succefully connected'))
    .catch(err => console.log(err));



const usersRouter = require("./routes/users")
app.use("/users", usersRouter);

const questionsRouter = require("./routes/questions");
app.use("/questions", questionsRouter);


const errorHandler = require("./errorHandler");
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));