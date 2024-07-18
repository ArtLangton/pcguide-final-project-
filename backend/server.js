const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const { findUserById } = require("./database/database");

// Store
const store = new session.MemoryStore();

const helmet = require("helmet");
app.use(helmet());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the public directory
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));  // Added line

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: [
      "https://localhost:3000",
      "https://eshopify-online-store.onrender.com",
      "https://eshopify-store.onrender.com",
      "https://synthetixy.com",
      "https://myapp.local:3000",
    ],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY || 'supersecret', 
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
      httpOnly: true,
    },
  })
);

if (process.env.ENVIRONMENT === "PRODUCTION") {
  app.set("trust proxy", 1);
}

app.use(passport.authenticate("session"));

const { authUser } = require("./auth");
passport.use(new LocalStrategy(authUser));

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const authRoutes = require("./routes/routes");
app.use("/auth", authRoutes);

// Development and Production
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log(`Listening on Port ${port}`);
});
