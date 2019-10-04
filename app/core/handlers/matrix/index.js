const faker = require('faker');

module.exports = {
    createOneAsync
};

/**
 * createOneAsync generates all nodes and edges in a given
 * adjacency matrix. Responds with 204 No Data.
 *
 * @param {Object} request - fastify request object
 * @param {Object} reply - fastify response object
 *
 * @returns {Promise}
 */
async function createOneAsync(request, reply) {
    const nodes = request.nodes;
    const edges = request.edges;

    const matrix = request.body.data;

    const results = await Promise.all(
        matrix.map(
            () => nodes.createAsync(faker.name.firstName())
        )
    );

    const peopleIDs = results.map(item => item.id);

    for (let i = 0; i < matrix.length; i++) {
        const neighbors = matrix[i];

        const relationships = [];
        for (let j = i + 1; j < neighbors.length; j++) {
            if (!neighbors[j]) {
                continue;
            }

            const n1ID = peopleIDs[i];
            const n2ID = peopleIDs[j];

            relationships.push([ n1ID, n2ID ]);
        }

        await Promise.all(
            relationships.map(
                item => edges.createAsync(...item)
            )
        );
    }

    return reply.code(204)
        .send();
}
