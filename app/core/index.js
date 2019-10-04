const fastify = require('fastify')({ logger: true });

const nodes = require('./nodes');
const edges = require('./edges');

const neo4jConnector = require('./neo4j/plugin');
const nodesConnector = require('./nodes/plugin');
const edgesConnector = require('./edges/plugin');

const nodeRoutes = require('./routes/nodes');
const edgeRoutes = require('./routes/edges');
const groupsRoutes = require('./routes/groups');
const matrixRoutes = require('./routes/matrix');

fastify.register(
    neo4jConnector,
    { uri: 'bolt://neo4j:7687' }
);

fastify.register(nodesConnector, { nodes });
fastify.register(edgesConnector, { edges });

fastify.register(nodeRoutes);
fastify.register(edgeRoutes);
fastify.register(groupsRoutes);
fastify.register(matrixRoutes);

const start = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }

};

start();
