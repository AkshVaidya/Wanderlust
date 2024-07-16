const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

MONGO_URL = `mongodb+srv://akshayvaidya2003:akshay1003@cluster0.prfkf86.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(MONGO_URL, {
    ignoreUndefined: true,
  })
  .then(() => {
    console.log("MongoDB2 connection Successful");
  });

const initDB = async () => {
  // await Listing.deleteMany({});

  // initData.data.map((obj) => ({ ...obj, owner: "6694b083eb53d3219de11169" }));

  // await Listing.insertMany(initData.data);

  // console.log("Data was Initialized");
  //await Listing.deleteMany({});
  await Listing.deleteMany({});

  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: "66942cf4d2310f79dfbdee93",
  }));

  await Listing.insertMany(updatedData);

  console.log("Data was Initialized");
};

initDB();
