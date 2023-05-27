const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("The database connection was successful!"))
  .catch((err) => {
    console.log(err);
    console.log("The connection to the database could not be made!");
  });
