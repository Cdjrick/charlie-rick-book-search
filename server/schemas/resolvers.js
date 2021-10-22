const { AuthenticationError } = require('apollo-server-errors');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            return User.findOne({ _id: context.user._id })
                .select('-__v -password')
        }
    },

    Mutation: {
        addUser: async (parent, args) => {

            const user = await User.create(args)
            const token = signToken(user)

            console.log('User Created Successfully')
            return { token, user }
        },

        loginUser: async (parent, { email, password }) => {

            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user)

            console.log('User Logged In Successfully')
            return { token, user }

            
        },

        saveBook: async (parent, args, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );
                
                console.log(updatedUser)
                return { updatedUser }
            } catch (err) {
                console.log(err);
                // return res.status(400).json(err);
            }
        },

        removeBook: async (parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            return { updatedUser }
        }
    }
}

module.exports = resolvers