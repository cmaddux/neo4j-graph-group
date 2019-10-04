module.exports = routes;

async function routes(fastify) {
    fastify.post(
        '/edges/:node1/knows/:node2',
        async (request, reply) => {
            const edges = request.edges;

            const n1ID = request.params.node1;
            const n2ID = request.params.node2;

            await edges.createAsync(n1ID, n2ID);
            return reply.code(201)
                .send();

        }
    );

}
