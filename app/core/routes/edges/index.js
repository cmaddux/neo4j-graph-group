const {
    createOneAsync
} = require('./../../handlers/edges');

module.exports = routes;

/**
 * Exposes all edge routes.
 *
 * @param {Object} fastify - scoped fastify object
 *
 * @returns {Promise}
 */
async function routes(fastify) {
    fastify.post(
        '/edges/:node1/knows/:node2',
        createOneAsync
    );

}
