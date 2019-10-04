const fastifyPlugin = require('fastify-plugin');

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

module.exports = fastifyPlugin(edgesConnector);
