const faker = require('faker');

module.exports = routes;

async function routes(fastify) {
    fastify.post(
        '/matrix',
        async (request, reply) => {
            const nodes = request.nodes;
            const edges = request.edges;

            const matrix = request.body.data;
            const nodesToCreate = matrix.map(
                () => nodes.createAsync(faker.name.firstName())
            );

            const results = await Promise.all(nodesToCreate);
            const peopleIDs = results
                .map(item => item.identity.toInt());

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
    );

}
