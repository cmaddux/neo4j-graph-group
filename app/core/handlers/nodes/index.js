const faker = require('faker');

module.exports = {
    getAllAsync,
    createOneAsync,
    deleteAllAsync
};

/**
 * getAllAsync retrieves all nodes current in the graph.
 * Responds with 200 OK and all node objects in graph.
 *
 * @param {Object} request - fastify request object
 * @param {Object} reply - fastify response object
 *
 * @returns {Promise}
 */
async function getAllAsync(request, reply) {
    const nodes = request.nodes;

    const records = await nodes.allAsync();
    return reply.code(200)
        .send({ data: records });
}

/**
 * createOneAsync generates a node with provided data
 * Responds with 201 Created and data for the
 * newly created node.
 *
 * @param {Object} request - fastify request object
 * @param {Object} reply - fastify response object
 *
 * @returns {Promise}
 */
async function createOneAsync(request, reply) {
    const nodes = request.nodes;

    const attributes = request.body.data.attributes;
    const { name } = attributes;

    const node = await nodes.createAsync(name);
    return reply.code(201)
        .send({ data: node });

}

/**
 * deleteAllAsync deletes all nodes current in the graph.
 * Responds with 204 No Data.
 *
 * @param {Object} request - fastify request object
 * @param {Object} reply - fastify response object
 *
 * @returns {Promise}
 */
async function deleteAllAsync(request, reply) {
    const nodes = request.nodes;

    await nodes.deleteAllAsync();

    return reply.code(204)
        .send();
}
