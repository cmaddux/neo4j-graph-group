const {
    createOneAsync
} = require('./../../handlers/edges');

module.exports = routes;

/**
 * routes exposes all routes related to retrieving grouping
 * stats.
 *
 * @param {Object} fastify - scoped fastify instance
 *
 * @returns {Promise}
 */
async function routes(fastify) {
    fastify.post(
        '/edges/:node1/knows/:node2',
        createOneAsync
    );

}
