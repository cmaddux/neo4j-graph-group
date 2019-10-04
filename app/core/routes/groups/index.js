module.exports = routes;

async function routes(fastify) {
    fastify.get(
        '/groups',
        async (request, reply) => {
            const session = request.neo4j;

            const result = await session.run(
                'CALL algo.unionFind( \
                   \'Person\', \
                   \'KNOWS\',  \
                   { write:true, partitionProperty:"partition"}) \
                YIELD nodes, setCount, loadMillis, computeMillis, writeMillis'
            );

            const firstRecord = result.records[0];
            const rawData = firstRecord.toObject();
            const data = Object.keys(rawData)
                .reduce(
                    (acc, key) => {
                        acc[key] = rawData[key].toInt();
                        return acc;
                    },
                    {}
                );

            return reply.code(200)
                .send(
                    { data }
                );

        }
    );

}
