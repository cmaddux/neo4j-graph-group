const mockCreateAsync = jest.fn(() => Promise.resolve());

module.exports = {
    mockCreateAsync,
    init: jest.fn(() => {
        return {
            createAsync: mockCreateAsync
        };
    })

};
