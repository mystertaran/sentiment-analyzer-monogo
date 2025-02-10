import express, { json } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { config } from 'dotenv';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { logger } from './utils/logger';

config();

const app = express();
const port = process.env.PORT || 4000;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server));

  app.listen(port, () => {
    logger.info(`Server ready at http://localhost:${port}/graphql`);
  });
}

startServer().catch((err) => {
  logger.error('Failed to start server:', err);
});
