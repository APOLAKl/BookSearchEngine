// import user model
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async function (parent, args, context) { 
      const foundUser = await User.findOne({_id: context.user._id});
  
      if (!foundUser) {
        throw new AuthenticationError("User is not found!")
      }
  
      // res.json(foundUser);
      return foundUser;
    },
  },
  Mutation: {
    createUser: async function(parent, args, context) {
      const user = await User.create({
        username: args.username,
        email: args.email,
        password: args.password
      });
  
      if (!user) {
       throw new AuthenticationError("No user found!")
      }
      const token = signToken(user);
      // res.json({ token, user });
      return {
        token, user
      }
    },
    login: async function(parent, args, context) {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        throw new AuthenticationError("No user found!")
      }
  
      const correctPw = await user.isCorrectPassword(args.password);
  
      if (!correctPw) {
        throw new AuthenticationError("No user found!")
      }
      const token = signToken(user);
      return({ token, user });
    },
    saveBook: async function(parent, args, context) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.bookToSave } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("No user found!")
      }
    },
    deleteBook: async function(parent, args, context) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new AuthenticationError("No user found!")
      }
      return updatedUser;
    },
  }
  
}

module.exports = resolvers;