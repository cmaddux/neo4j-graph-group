const faker = require('faker');
const supertest = require('supertest');

const mockNodes = require('./../__mocks__/nodes');
jest.mock('./../nodes', () => mockNodes);

const {
    mockAllAsync,
    mockCreateAsync,
    mockDeleteAllAsync
} = mockNodes;

const {
    fakeNode
} = require('./../test_utils');

const buildFastify = require('./../app');

afterEach(() => {
    mockAllAsync.mockClear();
    mockCreateAsync.mockClear();
    mockDeleteAllAsync.mockClear();
});

describe('Integration test GET nodes endpoint', () => {
    it('Should retrieve all nodes', async () => {
        const nodes = [fakeNode(), fakeNode()];

        mockAllAsync.mockReturnValueOnce(nodes);

        const expected = {
            data: nodes
        };

        const fastify = buildFastify();

        await fastify.ready();

        const response = await supertest(fastify.server)
            .get('/nodes')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8');

        expect(response.body).toEqual(expected);
    });

});

describe('Integration test POST nodes endpoint', () => {
    it('Should respond 400 BadRequest if no data key', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/nodes')
            .send({ bad: true })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8');
    });

    it('Should respond 400 BadRequest if no attributes key', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/nodes')
            .send(
                {
                    data: {
                        other: 'key'
                    }
                }
            )
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8');
    });

    it('Should respond 400 BadRequest if no name key', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/nodes')
            .send(
                {
                    data: {
                        attributes: {
                            notName: 'Me'
                        }
                    }
                }
            )
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8');
    });

    it('Should respond 400 BadRequest if name is empty string', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/nodes')
            .send(
                {
                    data: {
                        attributes: {
                            name: ''
                        }
                    }
                }
            )
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8');
    });

    it('Should respond 400 BadRequest if name is > 255 characters', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/nodes')
            .send(
                {
                    data: {
                        attributes: {
                            name: new Array(256).fill('a').join()
                        }
                    }
                }
            )
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8');
    });

    it('Should create node with given name', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        const name = faker.name.firstName();
        const node = fakeNode(null, { name });

        mockCreateAsync.mockReturnValueOnce(node);

        const expected = {
            data: {
                id: expect.any(Number),
                attributes: {
                    name
                }
            }
        };

        const response = await supertest(fastify.server)
            .post('/nodes')
            .send(
                {
                    data: {
                        attributes: {
                            name
                        }
                    }
                }
            )
            .expect(201)
            .expect('Content-Type', 'application/json; charset=utf-8');

        expect(response.body).toEqual(expected);

        expect(mockCreateAsync).toHaveBeenCalledTimes(1);
        expect(mockCreateAsync).toHaveBeenCalledWith(name);
    });

});

describe('Integration test DELETE nodes endpoint', () => {
    it('It should delete all nodes', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .delete('/nodes')
            .expect(204);

        expect(mockDeleteAllAsync).toHaveBeenCalledTimes(1);
    });
});
