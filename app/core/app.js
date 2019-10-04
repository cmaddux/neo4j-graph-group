const genFastify = require('fastify');

const nodes = require('./nodes');
const edges = require('./edges');

const neo4jConnector = require('./neo4j/plugin');
const nodesConnector = require('./nodes/plugin');
const edgesConnector = require('./edges/plugin');

const nodeRoutes = require('./routes/nodes');
const edgeRoutes = require('./routes/edges');
const groupsRoutes = require('./routes/groups');
const matrixRoutes = require('./routes/matrix');

module.exports = buildFastify;

/**
 * buildFastify builds base fastify API. The returned fastify
 * instance can listen for requests or be used in tests.
 *
 * @param {Object} opts - top level Fastify API options
 *
 * @returns {Object}
 */
function buildFastify(opts) {
    const fastify = genFastify(opts);

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

    return fastify;
}
