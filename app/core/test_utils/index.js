const mockSend = jest.fn();

const mockCode = jest.fn(() => {
    return {
        send: mockSend
    };

});

const defaultRequest = {
    params: {}
};

const defaultReply = {
    code: mockCode
};

module.exports = {
    mockSend,
    mockCode,
    defaultRequest,
    defaultReply
};
