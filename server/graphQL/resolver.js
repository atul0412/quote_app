
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//models

const User = require("../models/user");
const Quote = require("../models/Quotes");

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    // Get all users
    users: async () => {
      return await User.find({});
    },

    // Get user by ID
    user: async (_, { _id }) => {
      return await User.findById(_id);
    },

    // Get all quotes
    quotes: async () => {
      return await Quote.find({}).populate("author","_id name")
    },

    // Get all quotes by a specific author (user ID)
    quote: async (_, { author }) => {
      return await Quote.find({ author });
    },
  },

  User: {
    quotes: async(ur) => await Quote.find({author:ur._id})
  },

  
  //mutation part
  Mutation: {
    signupUser: async (_, { UserNew }) => {
      const user = await User.findOne({ email: UserNew.email });
      if (user) {
        throw new Error("User already exisists with that email");
      }
      const hashedPasword = await bcrypt.hash(UserNew.password, 12);

      const NewUser = new User({
        ...UserNew,
        password: hashedPasword,
      });
      return await NewUser.save();
    },
    loginUser: async (_, { userLogin }) => {
      const user = await User.findOne({ email: userLogin.email });
      if (!user) {
        throw new Error("User does not exist with that email");
      }

      const isMatch = await bcrypt.compare(userLogin.password, user.password);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token };
    },
    createQuote: async(_,{text},{userId})=>{
      if(!userId)
        throw new Error("User not logged in");
      const newQuote = new Quote({
        text,
        author:userId
      })
      await newQuote.save()
      return "Quote saved Done.!!"
    }
  },
};

module.exports = resolvers;
