if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const createError = require("http-errors");
const express = require("express");
const path = require("path");

const expressip = require("express-ip");
const app = express();

let port = process.env.PORT || 3000;

const mongoose = require("mongoose");

let registerRoute = require("./routes/register");
let loginRoute = require("./routes/login");
let otpRoute = require("./routes/otp");
let postsRoute = require("./routes/post");
let crimeRoute = require("./routes/crime");
let userRoute = require("./routes/users");
let dashboardRoute = require("./routes/dashboard");
let emergencyRoute = require("./routes/emergency");

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

app.enable("trust proxy");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressip().getIpInfoMiddleware);

app.use(express.static(path.join(__dirname, "assets")));

app.use(registerRoute);
app.use(loginRoute);
app.use(otpRoute);
app.use(postsRoute);
app.use(crimeRoute);
app.use(userRoute);
app.use(dashboardRoute);
app.use(emergencyRoute);

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
  console.log(err);
});

app.listen(port, () => {
  console.log(`App listening on port port`);
});
