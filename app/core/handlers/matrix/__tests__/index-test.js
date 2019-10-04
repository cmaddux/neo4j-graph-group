const handlers = require('./../');

const {
    mockSend,
    mockCode,
    defaultRequest: baseRequest,
    defaultReply
} = require('./../../../test_utils');

const mockNode = {
    identity: {
        toInt: jest.fn(() => Math.floor(Math.random() * 100000))
    }
};

const mockEdgesCreateAsync = jest.fn(() => Promise.resolve());
const mockNodesCreateAsync = jest.fn(() => Promise.resolve(mockNode));

const mockEdgesModule = {
    createAsync: mockEdgesCreateAsync
};

const mockNodesModule = {
    createAsync: mockNodesCreateAsync
};

const defaultRequest = {
    ...baseRequest,
    ...{
        edges: mockEdgesModule,
        nodes: mockNodesModule
    }
};

afterEach(() => {
    mockNodesCreateAsync.mockClear();
    mockEdgesCreateAsync.mockClear();
    mockSend.mockClear();
    mockCode.mockClear();
});

describe('Tests edge route handlers', () => {
    it('Should call nodes create async for every row in matrix', async () => {
        const matrix = [
            [ 1, 1, 1 ],
            [ 1, 1, 0 ],
            [ 1, 0, 1 ],
        ];

        const request = {
            ...defaultRequest,
            ...{
                body: {
                    data: matrix
                }
            }
        };

        const reply = { ...defaultReply };

        await handlers.createOneAsync(request, reply);

        expect(mockNodesCreateAsync).toHaveBeenCalledTimes(3);
    });

    it('Should call edges create async for every distinct edge pair', async () => {
        const matrix = [
            [ 1, 1, 1 ],
            [ 1, 1, 0 ],
            [ 1, 0, 1 ],
        ];

        const request = {
            ...defaultRequest,
            ...{
                body: {
                    data: matrix
                }
            }
        };

        const reply = { ...defaultReply };

        await handlers.createOneAsync(request, reply);

        expect(mockEdgesCreateAsync).toHaveBeenCalledTimes(2);
    });

    it('Should respond 204 No Data', async () => {
        const matrix = [
            [ 1, 0, 1 ],
            [ 0, 1, 0 ],
            [ 1, 0, 1 ],
        ];

        const request = {
            ...defaultRequest,
            ...{
                body: {
                    data: matrix
                }
            }
        };

        const reply = { ...defaultReply };

        await handlers.createOneAsync(request, reply);

        expect(mockCode).toHaveBeenCalledWith(204);
    });

    it('Should respond with empty body', async () => {
        const matrix = [
            [ 1, 0, 1 ],
            [ 0, 1, 0 ],
            [ 1, 0, 1 ],
        ];

        const request = {
            ...defaultRequest,
            ...{
                body: {
                    data: matrix
                }
            }
        };

        const reply = { ...defaultReply };

        await handlers.createOneAsync(request, reply);

        expect(mockSend).toHaveBeenCalledTimes(1);
        expect(mockSend.mock.calls[0]).toHaveLength(0);
    });
});
