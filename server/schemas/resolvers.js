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
      const user = await User.create(args);
  
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
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }
  
      const correctPw = await user.isCorrectPassword(body.password);
  
      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      res.json({ token, user });
    },
    // saveBook: async function({ user, body }, res) {
    //   console.log(user);
    //   try {
    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: user._id },
    //       { $addToSet: { savedBooks: body } },
    //       { new: true, runValidators: true }
    //     );
    //     return res.json(updatedUser);
    //   } catch (err) {
    //     console.log(err);
    //     return res.status(400).json(err);
    //   }
    // },
    // deleteBook: async function({ user, params }, res) {
    //   const updatedUser = await User.findOneAndUpdate(
    //     { _id: user._id },
    //     { $pull: { savedBooks: { bookId: params.bookId } } },
    //     { new: true }
    //   );
    //   if (!updatedUser) {
    //     return res.status(404).json({ message: "Couldn't find user with this id!" });
    //   }
    //   return res.json(updatedUser);
    // },
  }
  
}

module.exports = resolvers;