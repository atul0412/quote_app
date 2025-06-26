const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/user");
const Quote = require("../models/Quotes");

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findById(_id),
    quotes: async () => await Quote.find({}).populate("author", "_id name"),
    quote: async (_, { author }) => await Quote.find({ author }),
  },

  User: {
    quotes: async (ur) => await Quote.find({ author: ur._id }),
  },

  Mutation: {
    signupUser: async (_, { UserNew }) => {
      try {
        const user = await User.findOne({ email: UserNew.email });
        if (user) {
          throw new Error("User already exists with that email");
        }

        const hashedPassword = await bcrypt.hash(UserNew.password, 12);

        const NewUser = new User({
          ...UserNew,
          password: hashedPassword,
        });

        return await NewUser.save();
      } catch (err) {
        throw new Error(err.message || "Error signing up user");
      }
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

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token };
    },
    createQuote: async (_, { text }, { userId }) => {
      try {
        if (!userId) {
          throw new Error("User not logged in");
        }

        const newQuote = new Quote({
          text,
          author: userId,
        });

        await newQuote.save();
        return "Quote saved successfully!";
      } catch (err) {
        throw new Error(err.message || "Failed to create quote");
      }
    },
  },
};
module.exports = resolvers;
