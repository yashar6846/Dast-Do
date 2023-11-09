import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl ="mongodb+srv://yasharnajafi6846:12345yash6846@cluster0.jbwaaa5.mongodb.net/"
     
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;


  // "mongodb+srv://yasharnajafi6846:1234554321@cluster0.kfd8bdf.mongodb.net/"