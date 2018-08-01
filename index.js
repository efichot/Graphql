const { ApolloServer, gql } = require ('apollo-server')
const crypto = require('crypto')

const db = {
  users: [
    {id: '1', email: 'etienne@gmail.com', name: 'etienne', avatarUrl: 'https://dawdawd'},
    {id: '2', email: 'tim@gmail.com', name: 'tim', avatarUrl: 'https://uyutph'}
  ],
  messages: [
    { id: '1', userId: '1', body: 'Hello', createdAt: Date.now() },
    { id: '2', userId: '2', body: 'Hi', createdAt: Date.now() },
    { id: '3', userId: '1', body: 'What\'s up', createdAt: Date.now() },
  ]
}

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
    id: ID!,
    email: String!,
    name: String,
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    userId: String!
    body: String
    createdAt: String
  }
`

const resolvers = {
  Query: {
    users: () => db.users,
    messages: () => db.messages,
    user: (args) => db.users.find(v => v.id === args.id)
  },
  Mutation: {
    addUser: ({ email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        email,
        name,
        avatarUrl: 'https://gravatar/...'
      }
      db.users.push(user)
      return user
    }
  },
  User: {
    messages: ({ id }) => db.messages.filter(m => m.userId === id)
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(serverInfo => {
  console.log(`Apollo server listen to ${serverInfo.url}`)
})