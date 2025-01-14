import 'reflect-metadata';
import * as express from 'express';
import apolloLoader from '../loaders/apollo';
import expressLoader, { loadHandleError } from '../loaders/express';
import infrastructureLoader from '../loaders/infrastructure';
import eventEmitterLoader from '../loaders/event-emitter';
import commandLoader from '../loaders/command';
import dbConnection from '../loaders/typeorm';
import { logger } from '../logger/winston';
import { config } from '../config';

const startApiServer = async () => {
    const app = express();
    expressLoader({ app });
    await apolloLoader({ app });
    await dbConnection();

    await infrastructureLoader();
    await eventEmitterLoader();
    await commandLoader();
    loadHandleError({ app });

    app.listen(config.server.port, () => {
        logger.info(`Server ready at http://localhost:${config.server.port}`);
    });
};

startApiServer().catch((err) => logger.error(`Fail to start server, err: ${err.message}`));

// new App().app.listen({port: PORT}, () =>
//     console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`),
// );
