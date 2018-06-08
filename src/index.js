const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone`,
  },
  Mutation: {
    createLink: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description
        },
      }, info)
    },
    // updateLink: (root, args, context, info) => {
    //   return context.db.mutation.updateLink({
    //     data: {
    //       url: args.url,
    //       description: args.description
    //     },
    //   }, info)
      // const link = {
      //   id: args.id,
      //   description: args.description,
      //   url: args.url
      // }
      // links.push(link)
      // return link
  },
}


const server = new GraphQLServer({
  typeDefs: `./src/schema.graphql`,
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/gareth-gomersall-6b5991/hackernews-node/dev',
      secret: 'mysecret123',
      debug: true,
    })
  })
})
server.start(() => console.log(`Server running on http://localhost:${server.options.port}`))