const fastifyPlugin = require('fastify-plugin');

module.exports = fastifyPlugin(nodesConnector);

/**
 * nodesConnector applies the nodes utility module with the
 * request scoped session to the request object.
 *
 * @param {Object} fastify - scoped fastify instance
 * @param {Object} opts - options for connecting the nodes utility
 * @param {Object} opts.nodes - the base nodes module
 * @param {Function} opts.nodes.init - method to init module with session
 *
 * @returns {Promise}
 */
async function nodesConnector(fastify, opts) {
    const nodes = opts.nodes;

    fastify.addHook(
        'onRequest',
        (request, reply, done) => {
            const session = request.neo4j;
            request.nodes = nodes.init(session);
            done();
        }
    );

}
