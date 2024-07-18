const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path"); // For serving static files

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

app.use(cors({
  origin: [
    "https://localhost:3000",
    "https://eshopify-online-store.onrender.com",
    "https://eshopify-store.onrender.com",
    "https://synthetixy.com",
    "https://myapp.local:3000",
  ],
  credentials: true,
}));

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

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.listen(process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
