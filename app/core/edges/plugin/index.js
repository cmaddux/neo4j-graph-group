const fastifyPlugin = require('fastify-plugin');

module.exports = fastifyPlugin(edgesConnector);

/**
 * edgesConnector applies the edges utility module with the
 * request scoped session to the request object.
 *
 * @param {Object} fastify - scoped fastify instance
 * @param {Object} opts - options for connecting the edges utility
 * @param {Object} opts.edges - the base edges module
 * @param {Function} opts.edges.init - method to init module with session
 *
 * @returns {Promise}
 */
async function edgesConnector(fastify, opts) {
    const edges = opts.edges;

    fastify.addHook(
        'onRequest',
        (request, reply, done) => {
            const session = request.neo4j;
            request.edges = edges.init(session);
            done();
        }
    );

}
