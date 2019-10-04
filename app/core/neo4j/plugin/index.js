const fastifyPlugin = require('fastify-plugin');
const neo4j = require('neo4j-driver').v1;

async function neo4jConnector(fastify, options) {
    const uri = options.uri;

    const driver = neo4j.driver(uri);

    fastify.addHook(
        'onRequest',
        (request, reply, done) => {
            const session = driver.session();
            request.neo4j = session;
            done();
        }
    );

    fastify.addHook(
        'onResponse',
        (request, reply, done) => {
            const session = request.neo4j;
            session.close();
            done();
        }
    );

    fastify.addHook(
        'onClose',
        (instance, done) => {
            driver.close();
            done();
        }
    );

}

module.exports = fastifyPlugin(neo4jConnector);
