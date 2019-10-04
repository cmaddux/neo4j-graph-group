const handlers = require('./../');

const {
    mockSend,
    mockCode,
    defaultRequest: baseRequest,
    defaultReply
} = require('./../../../test_utils');

const mockCreateAsync = jest.fn(() => Promise.resolve());

const mockEdgesModule = {
    createAsync: mockCreateAsync
};

const defaultRequest = {
    ...baseRequest,
    ...{
        edges: mockEdgesModule
    }
};

afterEach(() => {
    mockCreateAsync.mockClear();
    mockSend.mockClear();
    mockCode.mockClear();
});

describe('Tests edge route handlers', () => {
    it('Should call create async with node ID parameters', async () => {
        const node1 = 10;
        const node2 = 20;
        const request = {
            ...defaultRequest,
            ...{
                params: {
                    node1,
                    node2
                }
            }
        };

        const reply = { ...defaultReply };

        await handlers.createOneAsync(request, reply);

        expect(mockCreateAsync).toHaveBeenCalledWith(node1, node2);
    });

    it('Should respond 204 No Data', async () => {
        const node1 = 10;
        const node2 = 20;
        const request = {
            ...defaultRequest,
            ...{
                params: {
                    node1,
                    node2
                }
            }
        };

        const reply = { ...defaultReply };

        await handlers.createOneAsync(request, reply);

        expect(mockCode).toHaveBeenCalledWith(204);
    });

    it('Should respond with empty body', async () => {
        const node1 = 10;
        const node2 = 20;
        const request = {
            ...defaultRequest,
            ...{
                params: {
                    node1,
                    node2
                }
            }
        };

        const reply = { ...defaultReply };

        await handlers.createOneAsync(request, reply);

        expect(mockSend).toHaveBeenCalledTimes(1);
        expect(mockSend.mock.calls[0]).toHaveLength(0);
    });
});
