const faker = require('faker');

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
    fakeNode,
    defaultRequest,
    defaultReply
};

/**
 * fakeNode returns a random fake node object.
 *
 * @param {Number} id - an ID to associate with the fake node object
 * @param {Object} attributes - attributes to associate with the fake
 *                              node object
 *
 * @returns {Object}
 */
function fakeNode(id, attributes) {
    const nodeID = id || Math.ceil(Math.random() * 10000);
    const nodeAttr = {
        ...{
            name: faker.name.firstName()
        },
        ...attributes
    };

    return {
        id: nodeID,
        attributes: nodeAttr
    };

}
