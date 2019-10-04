const {
    createOneAsync
} = require('./../../handlers/matrix');

const {
    createSchema
} = require('./../../schemas/matrix');

module.exports = routes;

/**
 * routes exposes all routes related to adjacency matrices.
 *
 * @param {Object} fastify - scoped fastify instance
 *
 * @returns {Promise}
 */
async function routes(fastify) {
    fastify.post(
        '/matrix',
        {
            schema: {
                body: createSchema
            }
        },
        createOneAsync
    );

}
