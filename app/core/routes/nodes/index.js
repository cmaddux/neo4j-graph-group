module.exports = routes;

const createNodeBodySchema = {
    type: 'object',
    properties: {
        data: {
            type: 'object',
            required: [ 'attributes' ],
            properties: {
                attributes: {
                    type: 'object',
                    required: [ 'name' ],
                    properties: {
                        name: {
                            type: 'string',
                            maxLength: 255
                        }
                    }
                }
            }
        }
    }
};


async function routes(fastify) {
    fastify.get(
        '/nodes',
        async (request, reply) => {
            const session = request.neo4j;

            const result = await session.run(
                'MATCH (n) RETURN n'
            );

            const records = result.records
                .map(item => {
                    const clean = item.get(0);
                    return {
                        id: clean.identity.toInt(),
                        attributes: clean.properties
                    };

                });

            reply.code(201)
                .send(
                    { data: records }
                );

        }
    );

    fastify.post(
        '/nodes',
        {
            schema: {
                body: createNodeBodySchema
            }
        },
        async (request, reply) => {
            const nodes = request.nodes;

            const attributes = request.body.data.attributes;
            const { name } = attributes;

            const node = await nodes.createAsync(name);
            reply.code(201)
                .send(
                    {
                        data: {
                            id: node.identity.toInt(),
                            attributes: node.properties
                        }
                    }
                );

        }
    );

    fastify.delete(
        '/nodes',
        async (request, reply) => {
            const session = request.neo4j;
            await session.run(
                'MATCH (n) DETACH DELETE n'
            );

            reply.code(204)
                .send();

        }
    );

}
