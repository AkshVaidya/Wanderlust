// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./utils/ExpressError.js");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");
// const listingsRouter = require("./routes/listing.js");
// const reviewsRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");
// const MONGO_URL = `mongodb+srv://akshayvaidya2003:akshay1003@cluster0.prfkf86.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose
//   .connect(MONGO_URL, {
//     ignoreUndefined: true,
//   })
//   .then(() => {
//     console.log("MongoDB connection Successful");
//   });

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "public")));
// app.locals.renderOptions = { async: true };

// const sessionOptions = {
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

// // app.get("/", (req, res) => {
// //   res.send("Hii,I am Root");
// // });

// app.use(session(sessionOptions));
// app.use(flash());

// app.use(
//   session({ secret: akshayvaidya, resave: false, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });

// // app.get("/demouser", async (req, res) => {
// //   let fakeUser = new User({
// //     email: "student@gmail.com",
// //     username: "delta-student",
// //   });

// //   let registeredUser = await User.register(fakeUser, "helloworld");
// //   res.send(registeredUser);
// // });

// app.use("/listings", listingsRouter);
// app.use("/listings/:id/reviews", reviewsRouter);
// app.use("/", userRouter);

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!"));
// });

// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong" } = err;
//   //res.status(statusCode).send(message);
//   res.status(statusCode).render("listings/error.ejs", { message });
// });

// const port = 8080;

// app.listen(port, () => {
//   console.log(`Server Start at ${port}`);
// });
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL = `mongodb+srv://akshayvaidya2003:akshay1003@cluster0.prfkf86.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(MONGO_URL, {
    ignoreUndefined: true,
  })
  .then(() => {
    console.log("MongoDB connection Successful");
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.locals.renderOptions = { async: true };

const sessionOptions = {
  secret: process.env.SECRET || "defaultSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
