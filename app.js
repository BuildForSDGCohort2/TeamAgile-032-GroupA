const createError = require("http-errors");
const express = require("express");
const path = require("path");
require("dotenv").config();

const mongoose = require("mongoose");

const app = express();

let registerRoute = require("./routes/register");
let loginRoute = require("./routes/login");
let otpRoute = require("./routes/otp");

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "assets")));

app.use(registerRoute);
app.use(loginRoute);
app.use(otpRoute);
// app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
