const {
    getAllAsync,
    createOneAsync,
    deleteAllAsync
} = require('./../../handlers/nodes');

const {
    createSchema
} = require('./../../schemas/nodes');

module.exports = routes;

/**
 * routes exposes all routes related to nodes.
 *
 * @param {Object} fastify - scoped fastify instance
 *
 * @returns {Promise}
 */
async function routes(fastify) {
    fastify.get(
        '/nodes',
        getAllAsync
    );

    fastify.post(
        '/nodes',
        {
            schema: {
                body: createSchema
            }
        },
        createOneAsync
    );

    fastify.delete(
        '/nodes',
        deleteAllAsync
    );

}
