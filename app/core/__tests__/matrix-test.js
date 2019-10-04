const supertest = require('supertest');

const mockNodes = require('./../__mocks__/nodes');
const mockEdges = require('./../__mocks__/edges');

jest.mock('./../nodes', () => mockNodes);
jest.mock('./../edges', () => mockEdges);

const {
    mockCreateAsync: mockCreateNodeAsync
} = mockNodes;

const {
    mockCreateAsync: mockCreateEdgeAsync
} = mockEdges;

const {
    fakeNode
} = require('./../test_utils');

const buildFastify = require('./../app');

afterEach(() => {
    mockCreateNodeAsync.mockClear();
    mockCreateEdgeAsync.mockClear();
});

describe('Integration test POST matrix endpoint', () => {
    it('Should return 400 Bad Request if no data key in body', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/matrix')
            .send({ bad: true })
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8');
    });

    it('Should return 400 Bad Request if data is not array', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/matrix')
            .send(
                {
                    data: true
                }
            )
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8');
    });

    it('Should return 400 Bad Request if is not 2D array', async () => {
        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/matrix')
            .send(
                {
                    data: new Array(10).fill(1)
                }
            )
            .expect(400)
            .expect('Content-Type', 'application/json; charset=utf-8');
    });

    it('Should create all nodes and edges', async () => {
        const matrix = [
            [ 1, 0, 0, 1 ], // ID: 1
            [ 0, 1, 1, 0 ], // ID: 2
            [ 0, 1, 1, 0 ], // ID: 3
            [ 1, 0, 0, 1 ]  // ID: 4
        ];

        const expectEdges = [
            [1, 4],
            [2, 3]
        ];

        mockCreateNodeAsync.mockReturnValueOnce(fakeNode(1))
            .mockReturnValueOnce(fakeNode(2))
            .mockReturnValueOnce(fakeNode(3))
            .mockReturnValueOnce(fakeNode(4));

        const fastify = buildFastify();

        await fastify.ready();

        await supertest(fastify.server)
            .post('/matrix')
            .send({ data: matrix })
            .expect(204);

        expect(mockCreateNodeAsync).toHaveBeenCalledTimes(4);

        expect(mockCreateEdgeAsync).toHaveBeenCalledTimes(2);

        for (let i = 0; i < expectEdges.length; i++) {
            expect(mockCreateEdgeAsync.mock.calls[i])
                .toEqual(expectEdges[i]);
        }

    });

});
