const {
    createOneAsync
} = require('./../../handlers/matrix');

module.exports = routes;

async function routes(fastify) {
    fastify.post(
        '/matrix',
        createOneAsync
    );

}
