module.exports = {
    createOneAsync
};

/**
 * createOneAsync creates an undirected edge between two nodes given
 * node ID values in request parameters. Returns 204 No Data
 * if success.
 *
 * @param {Object} request - fastify request object
 * @param {Object} reply - fastify response object
 *
 * @returns {Promise}
 */
async function createOneAsync(request, reply) {
    const edges = request.edges;

    const n1ID = request.params.node1;
    const n2ID = request.params.node2;

    await edges.createAsync(n1ID, n2ID);
    return reply.code(204)
        .send();

}
