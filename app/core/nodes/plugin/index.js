const fastifyPlugin = require('fastify-plugin');

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

module.exports = fastifyPlugin(nodesConnector);
