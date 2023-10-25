if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const User = require("./models/userModel");

// Connecting to Mongo Atlas Database
require("./db").connectToMongoose();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(session({ secret: process.env.sessionSec }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const port = process.env.port;

app.use("/auth", userRoutes);
app.use("/record", recordRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
