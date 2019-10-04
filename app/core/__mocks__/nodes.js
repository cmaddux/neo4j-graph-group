const mockAllAsync = jest.fn(() => Promise.resolve());
const mockCreateAsync = jest.fn(() => Promise.resolve());
const mockDeleteAllAsync = jest.fn(() => Promise.resolve());

module.exports = {
    mockAllAsync,
    mockCreateAsync,
    mockDeleteAllAsync,
    init: jest.fn(() => {
        return {
            allAsync: mockAllAsync,
            createAsync: mockCreateAsync,
            deleteAllAsync: mockDeleteAllAsync
        };
    })

};
