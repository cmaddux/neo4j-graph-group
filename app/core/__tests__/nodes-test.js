const faker = require('faker');
const supertest = require('supertest');

const mockAllAsync = jest.fn(() => Promise.resolve());

jest.mock('./../nodes', () => {
    return {
        init: jest.fn(() => {
            return {
                allAsync: mockAllAsync
            };
        })
    };

});

const buildFastify = require('./../app');

afterEach(() => {
    mockAllAsync.mockClear();
});

describe('Integration test GET nodes endpoint', () => {
    it('Should retrieve all nodes', async () => {
        const nodes = [
            {
                id: 1,
                attributes: {
                    name: faker.name.firstName()
                }
            },
            {
                id: 2,
                attributes: {
                    name: faker.name.firstName()
                }
            }
        ];

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
